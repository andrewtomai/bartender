import { expect } from 'chai';
import * as R from 'ramda';
import { createDrink } from './helpers/client';
import * as Validate from './helpers/Validate';

describe('Scenario: Interacting with Drinks', () => {
    describe('Given I want to create a drink', () => {
        describe('When I create the drink using a name', () => {
            const name = 'mixed drink';
            it('Then I get back my mixed Drink', async () => {
                const response = await createDrink({ name });
                Validate.createdDrink({ name }, response);
            });
        });
        describe('When I create the drink using a name and tags of other drinks', () => {
            const name = 'whiskey sour';
            let tagId;
            before('create the whiskey drink to use as a tag', async () => {
                const drinkForTag = await createDrink({ name: 'whiskey' });
                tagId = drinkForTag.data?.createDrink.id;
            });
            it('Then I get back my whiskey sour Drink', async () => {
                const response = await createDrink({ name, tags: [tagId] });
                const expectedTags = [{ id: tagId, name: 'whiskey' }];
                Validate.createdDrink({ name, tags: expectedTags }, response);
            });
        });
        describe('When I create the drink using a name and a recipe', () => {
            const name = 'whiskey';
            const recipe = [{ name: 'whiskey', quantity: '2oz' }];
            let ingrediantId;
            it('Then I get back my whiskey drink with its recipe', async () => {
                const response = await createDrink({ name, recipe });
                ingrediantId = R.path(['data', 'createDrink', 'recipe', 0, 'id'], response);
                Validate.createdDrink({ name, recipe }, response);
            });
            it('And upon creating the drink again, the previous ingrediant id is re-used', async () => {
                const response = await createDrink({ name, recipe });
                Validate.createdDrink({ name, recipe }, response);
                const secondIngrediantId = R.path(['data', 'createDrink', 'recipe', 0, 'id'], response);
                expect(secondIngrediantId).to.equal(
                    ingrediantId,
                    'The ingrediant from the second recipe was not re-used',
                );
            });
        });
    });
});
