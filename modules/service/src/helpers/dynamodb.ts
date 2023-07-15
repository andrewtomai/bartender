import AWS from 'aws-sdk';
import * as R from 'ramda';
import * as Environment from './Environment';
import Log from './Log';

export const clientConfiguration = (isOffline: boolean): AWS.DynamoDB.ClientConfiguration =>
    isOffline
        ? {
              apiVersion: '2012-08-10',
              region: 'localhost',
              endpoint: `http://localhost:8000`,
              accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
              secretAccessKey: 'DEFAULT_SECRET', // needed if you don't have aws credentials at all in env
          }
        : { apiVersion: '2012-08-10' };

const getClient = () => {
    const configuration = clientConfiguration(Environment.isOffline());
    return new AWS.DynamoDB(configuration);
};

export type DatabaseKeyPair = {
    primaryId: string;
    secondaryId: string;
};

type QueryKeyPair = MainTableQueryKeyPair | ReverseLookupKeyPair;

type MainTableQueryKeyPair = {
    primaryId: string;
    secondaryId?: string;
};

type ReverseLookupKeyPair = {
    primaryId?: string;
    secondaryId: string;
};

export enum IndexName {
    main,
    reverseLookup,
}

export enum SortKeyOperation {
    EQ = '=',
    LT = '<',
    LTE = '<=',
    GT = '>',
    GTE = '>=',
    BEGINS_WITH = 'begins_with',
}

export type DatabaseItem = DatabaseKeyPair & {
    createdAt?: string;
    [x: string]: unknown;
};

export type DatabaseNamedItem = DatabaseItem & {
    name: string;
};

export type DatabaseQuantifiedIngrediant = DatabaseNamedItem & {
    quantity: string;
};

type PutItemRequest = {
    PutRequest: {
        Item: Record<string, unknown>;
    };
};

// If item is truthy, then unmarshall it
const unmarshallOrNull = (item?: AWS.DynamoDB.AttributeMap): DatabaseItem | null =>
    item ? (AWS.DynamoDB.Converter.unmarshall(item) as DatabaseItem) : null;

// Returns true if the batch is empty
export const batchIsEmpty = (batch: unknown[]): boolean => batch.length === 0;

// Returns true if the batch is too large
export const batchIsTooLarge = (batch: unknown[]): boolean => batch.length > 25;

// Put Items ===================================================================

// This method puts an item to dynamodb
// @sig putItem :: (Object) -> Promise
export const putItem = async (data: DatabaseItem): Promise<DatabaseItem> => {
    Log.info(Environment.tableName());
    const dynamoDb = getClient();
    const params = {
        Item: AWS.DynamoDB.Converter.marshall(data),
        TableName: Environment.tableName(),
    };
    await dynamoDb.putItem(params).promise();
    return data;
};

// Given an item, format it for a batch put item request
const enrichBatchPutItemRequest = (item: DatabaseItem): PutItemRequest => ({
    PutRequest: {
        Item: AWS.DynamoDB.Converter.marshall(item),
    },
});

// Given an array of items, write them to the databse
export const putItems = async (items: DatabaseItem[]): Promise<DatabaseItem[]> => {
    if (batchIsEmpty(items)) return [];
    if (batchIsTooLarge(items)) throw new Error('Put items batch too large');
    Log.info(`Writing [${items.length}] items to the database`);
    const dynamoDb = getClient();
    const putItemRequests = R.map(enrichBatchPutItemRequest, items);
    const params = {
        RequestItems: {
            [Environment.tableName()]: putItemRequests,
        },
    };
    do {
        const response = await dynamoDb.batchWriteItem(params).promise();
        params.RequestItems = response.UnprocessedItems ?? {};
    } while (R.keys(params.RequestItems).length !== 0);
    return items;
};

// Get Items ===================================================================

// This method gets an item from dynamodb
// @sig getITem :: (Keys) -> Item
export const getItem = async (keys: DatabaseKeyPair): Promise<DatabaseItem | null> => {
    const dynamoDb = getClient();
    const params = {
        Key: AWS.DynamoDB.Converter.marshall(keys),
        TableName: Environment.tableName(),
    };
    const { Item } = await dynamoDb.getItem(params).promise();
    return unmarshallOrNull(Item);
};

// This method gets items given key pairs
export const getItems = async (items: DatabaseKeyPair[]): Promise<(DatabaseItem | null)[]> => {
    if (batchIsEmpty(items)) return [];
    if (batchIsTooLarge(items)) throw new Error('Get items batch too large');
    Log.info(`Getting [${items.length}] items to the database`);
    const dynamoDb = getClient();
    const getItemRequests = R.map(AWS.DynamoDB.Converter.marshall, items);
    const params = {
        RequestItems: {
            [Environment.tableName()]: {
                Keys: getItemRequests,
            },
        },
    };
    let responseItems: AWS.DynamoDB.ItemList = [];
    do {
        const response = await dynamoDb.batchGetItem(params).promise();
        params.RequestItems = response.UnprocessedKeys ?? {};
        const responseBatch = response.Responses?.[Environment.tableName()] ?? [];
        responseItems = [...responseItems, ...responseBatch];
    } while (R.keys(params.RequestItems).length !== 0);
    return R.map(unmarshallOrNull, responseItems);
};

// QUERY ===================================================================
export const expressionAttributeValues = (
    key: Partial<DatabaseKeyPair>,
    index: IndexName,
): AWS.DynamoDB.ExpressionAttributeValueMap => {
    const sortKeyValue = R.prop(sortKeyName(index), key);
    const partitionKeyValue = R.prop(partitionKeyName(index), key);
    return {
        ':pk': AWS.DynamoDB.Converter.input(partitionKeyValue),
        ...(sortKeyValue ? { ':sk': AWS.DynamoDB.Converter.input(sortKeyValue) } : {}),
    };
};

const partitionKeyName = (index: IndexName) => {
    if (index === IndexName.main) return 'primaryId';
    if (index === IndexName.reverseLookup) return 'secondaryId';
    throw new Error(`Invalid index supplied: [${index}]`);
};
const sortKeyName = (index: IndexName) => {
    if (index === IndexName.main) return 'secondaryId';
    if (index === IndexName.reverseLookup) return 'primaryId';
    throw new Error(`Invalid index supplied: [${index}]`);
};

export const keyExpression = (key: QueryKeyPair, index: IndexName, operation?: SortKeyOperation): string => {
    const baseExpression = `${partitionKeyName(index)} = :pk`;
    const sortKey = R.prop(sortKeyName(index), key);
    if (sortKey) {
        if (operation === SortKeyOperation.BEGINS_WITH) {
            return `${baseExpression} AND begins_with(${sortKeyName(index)}, :sk)`;
        }
        return `${baseExpression} AND ${sortKeyName(index)} ${operation} :sk`;
    }
    return baseExpression;
};

// Given an index name, return the correct dynamodb GSI name.
const calculateIndexName = (index: IndexName) => {
    if (index === IndexName.reverseLookup) return Environment.reverseLookup();
};

// Given a key pair and operation, query the reverse lookup
export const queryReverseLookup = async (
    key: ReverseLookupKeyPair,
    operation: SortKeyOperation = SortKeyOperation.BEGINS_WITH,
): Promise<DatabaseItem[] | null> => {
    return query(key, operation, IndexName.reverseLookup);
};

// Given a key pair and an operation, query the reverse lookup
export const queryTable = async (
    key: MainTableQueryKeyPair,
    operation: SortKeyOperation = SortKeyOperation.BEGINS_WITH,
): Promise<DatabaseItem[] | null> => {
    return query(key, operation, IndexName.main);
};

const query = async (key: QueryKeyPair, operation: SortKeyOperation, index: IndexName) => {
    const dynamoDb = getClient();
    const params = {
        ExpressionAttributeValues: expressionAttributeValues(key, index),
        KeyConditionExpression: keyExpression(key, index, operation),
        TableName: Environment.tableName(),
        IndexName: calculateIndexName(index),
    };
    const response = await dynamoDb.query(params).promise();
    const { Items } = response;
    if (Items) return R.map(AWS.DynamoDB.Converter.unmarshall, Items) as DatabaseItem[];
    return null;
};
