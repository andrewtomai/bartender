import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import * as DynamoDb from '../helpers/dynamodb';
import { Maybe, QuantifiedIngrediantInput, QuantifiedIngrediant } from '../generated/graphql-types';
import * as Id from './Id';

// Given an ingrediantId and a name, enrich it to become a database ingrediant
export const enrichInputIngrediant = (ingrediantId: string, name: string): DynamoDb.DatabaseNamedItem => ({
    primaryId: Id.enrichDatabaseIngrediantId(ingrediantId),
    secondaryId: Id.enrichDatabaseNameId(name),
    name,
});

export const enrichQuantifiedInputIngrediant = (
    drinkId: string,
    ingrediantId: string,
    name: string,
    quantity: string,
): DynamoDb.DatabaseQuantifiedIngrediant => ({
    primaryId: Id.enrichDatabaseDrinkId(drinkId),
    secondaryId: Id.enrichDatabaseIngrediantId(ingrediantId),
    quantity,
    name,
});

export const formatQuantifiedIngrediant = (item: DynamoDb.DatabaseQuantifiedIngrediant): QuantifiedIngrediant => ({
    id: Id.extractIngrediantId(item.secondaryId),
    name: item.name,
    quantity: item.quantity,
});

export const reverseLookupKey = (ingrediantName: string): Partial<DynamoDb.DatabaseKeyPair> => ({
    secondaryId: Id.enrichDatabaseNameId(ingrediantName),
    primaryId: Id.INGREDIANT_ID_PREFIX,
});

const pluckFirstIngrediantId = (items: Maybe<DynamoDb.DatabaseItem[]>) =>
    items && R.head(items) ? Id.extractIngrediantId(R.head(items).primaryId) : null;

export const findExistingIngrediantIds = async (ingrediantNames: []): Promise<Record<string, string>> => {
    const reverseLookupKeys = R.map(reverseLookupKey, ingrediantNames);
    const ingrediantDatabaseItems = await Promise.all(R.map(DynamoDb.queryReverseLookup, reverseLookupKeys));

    console.log('hiya', ingrediantDatabaseItems);
    const ingrediantIds = R.map(pluckFirstIngrediantId, ingrediantDatabaseItems);
    const nameToIdIndex = R.zipObj(ingrediantNames, ingrediantIds);
    return R.reject(R.isNil, nameToIdIndex);
};

// Given a drinkId and an index of existing ingrediant ids,
// calculate the items needed to create the quantified ingrediant
export const ingrediantItemsToWrite =
    (drinkId: string, ingrediantNameToIdIndex: Record<string, string>) =>
    (quantifiedIngrediantInput: QuantifiedIngrediantInput): DynamoDb.DatabaseItem[] => {
        const { name, quantity } = quantifiedIngrediantInput;
        const existingIngrediantId = R.prop(name, ingrediantNameToIdIndex);
        if (existingIngrediantId) {
            // we just need to create the quantified ingrediant
            return [enrichQuantifiedInputIngrediant(drinkId, existingIngrediantId, name, quantity)];
        }
        const ingrediantId = uuid();
        return [
            enrichQuantifiedInputIngrediant(drinkId, ingrediantId, name, quantity),
            enrichInputIngrediant(ingrediantId, name),
        ];
    };

// Given a drinkId and a recipe, calculate all of the items to write to get the recipe into the database
export const enrichInputRecipe = async (
    drinkId: string,
    recipe: Maybe<QuantifiedIngrediantInput[]>,
): Promise<DynamoDb.DatabaseItem[]> => {
    if (!recipe) return [];
    const names = R.pluck('name', recipe);
    const ingrediantNameToIdIndex = await findExistingIngrediantIds(names);
    return R.flatten(R.map(ingrediantItemsToWrite(drinkId, ingrediantNameToIdIndex), recipe));
};
