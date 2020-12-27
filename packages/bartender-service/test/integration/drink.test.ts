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
    });
    describe.skip('When I create the drink using a name and a recipe', () => {
        // const name = 'whiskey';
        // const recipe = [{ name: 'whiskey', quantity: '2oz' }];
        // let response;
    });
});
