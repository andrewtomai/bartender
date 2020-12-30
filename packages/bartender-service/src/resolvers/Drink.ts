import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import * as DynamoDb from '../helpers/dynamodb';
import { Maybe, Drink, DrinkInput, QuantifiedIngrediant } from '../generated/graphql-types';
import * as Id from './Id';
import * as Ingrediant from './Ingrediant'

// Enrich for retrieval from the database
export const enrichInputDrink = (drinkId: string, name: string): DynamoDb.DatabaseNamedItem => ({
    ...enrichDrinkKeyPair(drinkId),
    createdAt: new Date().toISOString(),
    name,
});

// Given a drinkId and a tagId, enrich it to become a database key pair
export const enrichInputTags = (drinkId: string) => (tagId: string): DynamoDb.DatabaseKeyPair => ({
    primaryId: Id.enrichDatabaseDrinkId(drinkId),
    secondaryId: Id.enrichDatabaseTagId(tagId),
});

// Given a drinkId, enrich it to become a database key pair
export const enrichDrinkKeyPair = (drinkId: string, secondaryId?: string): DynamoDb.DatabaseKeyPair => ({
    primaryId: Id.enrichDatabaseDrinkId(drinkId),
    secondaryId: secondaryId ?? Id.enrichDatabaseDrinkId(drinkId),
});

// Given a tag from a databasee, format it for output from graphql
export const pluckTagId = (databaseTag: DynamoDb.DatabaseItem): string => Id.extractTagId(databaseTag.secondaryId);

// Given a drink from a database, and tags from a database, format the drink for graphql output
export const formatDrink = (databaseDrink: DynamoDb.DatabaseNamedItem): Drink => ({
    id: Id.extractDrinkId(databaseDrink.primaryId),
    name: databaseDrink.name,
});

// Resolvers =======================================================================================
export const drinkResolver = async (parent: unknown, args: { id: string }): Promise<Maybe<Drink>> => {
    const { id } = args;
    const databaseId = Id.enrichDatabaseDrinkId(id);
    const drink = await DynamoDb.getItem({ primaryId: databaseId, secondaryId: databaseId });
    if (!drink) return null;
    return {
        id: Id.extractDrinkId(drink.primaryId),
        name: drink.name as string,
    };
};

export const recipeForDrinkResolver = async (parent: Drink): Promise<QuantifiedIngrediant[]> => {
    const { id } = parent;
    const ingrediantItems = await DynamoDb.queryTable(enrichDrinkKeyPair(id, Id.INGREDIANT_ID_PREFIX));
    return R.map(Ingrediant.formatQuantifiedIngrediant, ingrediantItems);
};

export const tagsForDrinkResolver = async (parent: Drink): Promise<Drink[]> => {
    const { id } = parent;
    const tagItems = await DynamoDb.queryTable(enrichDrinkKeyPair(id, Id.TAG_ID_PREFIX));
    const drinkIds = R.map(pluckTagId, tagItems);
    const drinkKeyPairs: DynamoDb.DatabaseKeyPair[] = R.map(enrichDrinkKeyPair, drinkIds);
    const drinkItems = await DynamoDb.getItems(drinkKeyPairs);
    return R.map(formatDrink, drinkItems);
};

export const createDrinkResolver = async (parent: unknown, args: { drink: DrinkInput }): Promise<Drink> => {
    const { name, tags = [], recipe = [] } = args.drink;
    const id = uuid();
    const drinkItem = enrichInputDrink(id, name);
    const tagItems = R.map(enrichInputTags(id), tags);
    const ingrediantItems = await Ingrediant.enrichInputRecipe(id, recipe);
    await DynamoDb.putItems([drinkItem, ...tagItems, ...ingrediantItems]);
    return formatDrink(drinkItem);
};
