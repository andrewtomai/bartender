import { expect } from 'chai';
import * as R from 'ramda';

export const drink = (expectedDrink: Record<string, unknown>, actualResponse: Record<string, unknown>): void => {
    expect(actualResponse.status).to.equal(200);
    const drink = R.path(['data', 'drink'], actualResponse) || R.path(['data', 'createDrink'], actualResponse);
    expect(drink).to.have.property('id');
    expect(drink).to.deep.include(expectedDrink);
};
