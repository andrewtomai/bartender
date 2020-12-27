import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import * as DynamoDb from '../helpers/dynamodb';
import { Maybe, Drink, DrinkInput } from '../generated/graphql-types';

const extractDrinkId = (databaseDrinkId: string) => databaseDrinkId.split('DRINK#').join('');
const extractTagId = (databaseTagId: string) => databaseTagId.split('TAG#').join('');

const enrichDatabaseDrinkId = (id: string) => `DRINK#${id}`;
const enrichDatabaseTagId = (id: string) => `TAG#${id}`;

// Enrich for retrieval from the database
const enrichInputDrink = (drinkId: string, name: string): DynamoDb.DatabaseDrink => ({
    ...enrichDrinkKeyPair(drinkId),
    createdAt: new Date().toISOString(),
    name,
});

const enrichInputTags = (drinkId: string) => (tagId: string): DynamoDb.DatabaseKeyPair => ({
    primaryId: enrichDatabaseDrinkId(drinkId),
    secondaryId: enrichDatabaseTagId(tagId),
});

const enrichDrinkKeyPair = (drinkId: string): DynamoDb.DatabaseKeyPair => ({
    primaryId: enrichDatabaseDrinkId(drinkId),
    secondaryId: enrichDatabaseDrinkId(drinkId),
});

// Format for output from database
const formatTag = (databaseTag: DynamoDb.DatabaseItem) => ({ id: extractTagId(databaseTag.secondaryId) });

const formatDrink = (databaseDrink: DynamoDb.DatabaseDrink, databaseTags?: DynamoDb.DatabaseItem[]): Drink => ({
    id: extractDrinkId(databaseDrink.primaryId),
    name: databaseDrink.name,
    tags: databaseTags ? R.map(formatTag, databaseTags) : null,
});

export const drinkResolver = async (parent: unknown, args: { id: string }): Promise<Maybe<Drink>> => {
    const { id } = args;
    const databaseId = enrichDatabaseDrinkId(id);
    const drink = await DynamoDb.getItem({ primaryId: databaseId, secondaryId: databaseId });
    if (!drink) return null;
    return {
        id: extractDrinkId(drink.primaryId),
        name: drink.name as string,
    };
};

export const tagsForDrinkResolver = async (parent: Drink): Promise<Drink[]> => {
    const { tags } = parent;
    const ids = R.pluck('id', tags);
    const tagKeyPairs: DynamoDb.DatabaseKeyPair[] = R.map(enrichDrinkKeyPair, ids);
    const tagItems = await DynamoDb.getItems(tagKeyPairs);
    return R.map(formatDrink, tagItems);
};

export const createDrinkResolver = async (parent: unknown, args: { drink: DrinkInput }): Promise<Drink> => {
    const { name, tags = [] } = args.drink;
    const id = uuid();
    const drinkItem = enrichInputDrink(id, name);
    const tagItems = R.map(enrichInputTags(id), tags);
    await DynamoDb.putItems([drinkItem, ...tagItems]);
    return formatDrink(drinkItem, tagItems);
};
