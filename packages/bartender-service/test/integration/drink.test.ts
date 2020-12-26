import Query from './helpers/client';
import * as Validate from './helpers/Validate';

describe('Scenario: Interacting with Drinks', () => {
    let mixedDrinkId, whiskeyDrinkId;
    describe('Given I want to create a drink', () => {
        describe('When I create the drink using a name', () => {
            const name = 'mixed drink';
            let response;
            before('create the mixed drink', async () => {
                const q = `#graphql
                    mutation CreateDrink($drink: DrinkInput!) {
                        createDrink(drink: $drink) {
                            id,
                            name,
                        }
                    }
                `;
                response = await Query(q, { drink: { name } });
                mixedDrinkId = response.data.createDrink.id;
            });
            it('Then I get back my mixed Drink', async () => {
                Validate.drink({ name }, response);
            });
            it('And I can now retrieve the mixed drink using its Id', async () => {
                const q = `#graphql
                    query GetDrink($id: UUID!) {
                        drink(id:  $id) {
                            id,
                            name
                        }
                    }
                `;
                const getDrinkResponse = await Query(q, { id: mixedDrinkId });
                Validate.drink({ name }, getDrinkResponse);
            });
        });
        describe.skip('When I create the drink using a name and a recipe', () => {
            const name = 'whiskey';
            const recipe = [{ name: 'whiskey', quantity: '2oz' }];
            let response;
            before('create the mixed drink', async () => {
                const q = `#graphql
                    mutation CreateDrink($drink: DrinkInput!) {
                        createDrink(drink: $drink) {
                            id,
                            name,
                            recipe {
                                ingrediant {
                                    name
                                },
                                quantity
                            }
                        }
                    }
                `;
                response = await Query(q, { drink: { name: name, recipe } });
                whiskeyDrinkId = response.data.id;
            });
            it('Then I get back my mixed Drink', async () => {
                Validate.drink({ name, recipe }, response);
            });
            it('And I can now retrieve the mixed drink using its Id', async () => {
                const q = `#graphql
                    query GetDrink($drinkId: UUID!) {
                        drink(id:  $id) {
                            id,
                            name,
                            recipe {
                                ingrediant {
                                    name
                                },
                                quantity
                            }
                        }
                    }
                `;
                const getDrinkResponse = await Query(q, { drinkId: whiskeyDrinkId });
                Validate.drink({ name, recipe }, getDrinkResponse);
            });
        });
        describe.skip('When I create the drink using a name, a recipe, and tags of other drinks', () => {
            const name = 'whiskey sour';
            const recipe = [
                { name: 'whiskey', quantity: '2oz' },
                { name: 'sour mix', quantity: '1oz' },
            ];
            const tags = [mixedDrinkId, whiskeyDrinkId];
            let response;
            before('create the mixed drink', async () => {
                const q = `#graphql
                    mutation CreateDrink($drink: DrinkInput!) {
                        createDrink(drink: $drink) {
                            id,
                            name,
                        }
                    }
                `;
                response = await Query(q, { drink: { name: name, recipe, tags } });
                whiskeyDrinkId = response.data.id;
            });
            it('Then I get back my mixed Drink', async () => {
                Validate.drink({ name, recipe, tags }, response);
            });
            it('And I can now retrieve the mixed drink using its Id', async () => {
                const q = `#graphql
                    query GetDrink($drinkId: UUID!) {
                        drink(id:  $id) {
                            id,
                            name,
                            recipe {
                                ingrediant {
                                    name
                                },
                                quantity
                            },
                            tags {
                                id
                            }
                        }
                    }
                `;
                const getDrinkResponse = await Query(q, { drinkId: response.data.id });
                Validate.drink({ name, recipe, tags }, getDrinkResponse);
            });
        });
    });
});
