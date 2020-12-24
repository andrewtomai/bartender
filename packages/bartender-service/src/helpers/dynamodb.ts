import AWS from 'aws-sdk';
import * as Environment from './Environment';
import Log from './log';

const getClient = () => {
    const configuration = Environment.isOffline()
        ? {
              apiVersion: '2012-08-10',
              region: 'localhost',
              endpoint: `http://localhost:8000`,
          }
        : { apiVersion: '2012-08-10' };
    return new AWS.DynamoDB(configuration);
};

export type DatabaseKeyPair = {
    primaryId: string;
    secondaryId: string;
};

export type DatabaseItem = DatabaseKeyPair & {
    createdAt: string;
    [x: string]: unknown;
};

// This method puts an item to dynamodb
// @sig putItem :: (Object) -> Promise
export const putItem = async (data: DatabaseItem): Promise<DatabaseItem> => {
    Log.info('hiya hiya');
    Log.info(Environment.tableName());
    const dynamoDb = getClient();
    const params = {
        Item: AWS.DynamoDB.Converter.marshall(data),
        TableName: Environment.tableName(),
    };
    await dynamoDb.putItem(params).promise();
    return data;
};

// This method gets an item from dynamodb
// @sig getITem :: (Keys) -> Item
export const getItem = async (keys: DatabaseKeyPair): Promise<DatabaseItem | null> => {
    const dynamoDb = getClient();
    const params = {
        Key: AWS.DynamoDB.Converter.marshall(keys),
        TableName: Environment.tableName(),
    };
    const { Item } = await dynamoDb.getItem(params).promise();
    if (Item) return AWS.DynamoDB.Converter.unmarshall(Item) as DatabaseItem;
    return null;
};
