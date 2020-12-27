import { expect } from 'chai';
import * as R from 'ramda';

export const createdDrink = (expectedDrink: Record<string, unknown>, actualResponse: Record<string, unknown>): void => {
    expect(actualResponse.status).to.equal(200);
    const drink = R.path(['data', 'createDrink'], actualResponse);
    expect(drink).to.have.property('id');
    expect(drink).to.deep.include(expectedDrink);
    const errors = R.prop('errors', actualResponse);
    expect(errors).to.equal(undefined, 'There should be no errors.');
};
