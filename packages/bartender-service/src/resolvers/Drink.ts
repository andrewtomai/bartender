import { v4 as uuid } from 'uuid';
import * as DynamoDb from '../helpers/dynamodb';
import { Maybe, Drink, DrinkInput } from '../generated/graphql-types';

const drinkId = (databaseDrinkId: string) => databaseDrinkId.split('DRINK#').join('');
const databaseDrinkId = (id?: string) => `DRINK#${id || uuid()}`;

export const drinkResolver = async (parent: unknown, args: { id: string }): Promise<Maybe<Drink>> => {
    const { id } = args;
    const databaseId = databaseDrinkId(id);
    const drink = await DynamoDb.getItem({ primaryId: databaseId, secondaryId: databaseId });
    if (!drink) return null;
    return {
        id: drinkId(drink.primaryId),
        name: drink.name as string,
    };
};

export const createDrinkResolver = async (parent: unknown, args: { drink: DrinkInput }): Promise<Drink> => {
    const { drink } = args;
    const id = databaseDrinkId();
    const createdAt = new Date().toISOString();
    await DynamoDb.putItem({
        primaryId: id,
        secondaryId: id,
        createdAt,
        ...drink,
    });
    return {
        id: drinkId(id),
        name: drink.name,
    };
};
