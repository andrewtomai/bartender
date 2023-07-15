import { expect } from 'chai';
import * as R from 'ramda';

export const createdDrink = (expectedDrink: Record<string, unknown>, actualResponse: Record<string, unknown>): void => {
    expect(actualResponse.status).to.equal(200);
    const drink = R.path(['data', 'createDrink'], actualResponse);
    expect(drink).to.have.property('id');
    if (expectedDrink.name) expect(drink).to.have.property('name', expectedDrink.name);
    if (expectedDrink.id) expect(drink).to.have.property('id', expectedDrink.id);
    if (expectedDrink.tags) expect(drink.tags).to.deep.equal(expectedDrink.tags as []);
    if (expectedDrink.recipe) {
        expect(drink).to.have.property('recipe').instanceOf(Array);
        const actualRecipeWithoutIds = R.map(R.dissoc('id'), drink.recipe);
        expect(actualRecipeWithoutIds).to.have.deep.members(expectedDrink.recipe as []);
    }
    const errors = R.prop('errors', actualResponse);
    expect(errors).to.equal(undefined, 'There should be no errors.');
};
