import { Maybe, Drink } from '../generated/graphql-types';

export const drinkResolver = (): Maybe<Drink> => {
    return null;
};

export const createDrinkResolver = (): Drink => ({
    id: 'my id',
    name: 'my name',
});
