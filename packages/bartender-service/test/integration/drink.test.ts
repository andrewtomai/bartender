import * as R from 'ramda'
import { expect } from 'chai'
import Query from './helpers/client';


describe('Scenario: Creating Drinks', () => {
    let mixedDrinkId, whiskeyDrinkId;
    describe('Given a name of a drink', () => {
        const drinkName = 'mixed drink'
        describe('When I create the drink', () => {
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
                response = await Query(q, { drink: { name: drinkName }});
                mixedDrinkId = response.data.createDrink.id;
            })
            it('Then I get back my mixed Drink', async () => {
                const drink = R.path(['data', 'createDrink'], response)
                expect(response.status).to.equal(200)
                expect(drink).to.have.property('id')
                expect(drink).to.have.property('name', drinkName)
            })
            it('And I can now retrieve the mixed drink using its Id', async () => {
                const q = `#graphql
                    query GetDrink($id: ID!) {
                        drink(id:  $id) {
                            id,
                            name
                        }
                    }
                `
                const getDrinkResponse = await Query(q, { id: mixedDrinkId });
                const drink = R.path(['data', 'drink'], response)
                expect(getDrinkResponse.status).to.equal(200)
                expect(drink).to.have.property('id')
                expect(drink).to.have.property('name', drinkName)
            })
        })
    })

    describe('Given a name of a drink and it\'s recipe', () => {
        const drinkName = 'whiskey'
        const recipe = [
            { name: 'whiskey', quantity: '2oz' },
        ]
        describe('When I create the drink', () => {
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
                response = await Query(q, { drink: { name: drinkName, recipe }});
                whiskeyDrinkId = response.data.id;
            })
            it('Then I get back my mixed Drink', async () => {
                const drink = R.path(['data', 'drink'], response)
                expect(response.status).to.equal(200)
                expect(drink).to.have.property('id')
                expect(drink).to.have.property('name', drinkName)
            })
            it('And I can now retrieve the mixed drink using its Id', async () => {
                const q = `#graphql
                    query GetDrink($drinkId: ID!) {
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
                `
                const getDrinkResponse = await Query(q, { drinkId: response.data.id }); 
                const drink = R.path(['data', 'drink'], getDrinkResponse)
                expect(getDrinkResponse.status).to.equal(200)
                expect(drink).to.have.property('id')
                expect(drink).to.have.property('name', drinkName)
                expect(drink).to.have.property('recipe').to.be.instanceOf(Array)
                expect(drink.recipe[0]).to.have.property('ingrediant').to.have.property('name', 'whiskey')
                expect(drink.recipe[0]).to.have.property('quantity', '2oz')
            })
        })
    })
    
    describe('Given a drink, it\'s recipe, and it\'s tags', () => {
        const drinkName = 'whiskey sour'
        const recipe = [
            { name: 'whiskey', quantity: '2oz' },
            { name: 'sour mix', quantity: '1oz' },
        ]
        const tags = [
            mixedDrinkId,
            whiskeyDrinkId,
        ]
        describe('When I create the drink', () => {
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
                response = await Query(q, { drink: { name: drinkName, recipe, tags }});
                whiskeyDrinkId = response.data.id;
            })
            it('Then I get back my mixed Drink', async () => {
                const drink = R.path(['data', 'createDrink'], response)
                expect(response.status).to.equal(200)
                expect(drink).to.have.property('id')
                expect(drink).to.have.property('name', drinkName)
            })
            it('And I can now retrieve the mixed drink using its Id', async () => {
                const q = `#graphql
                    query GetDrink($drinkId: ID!) {
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
                `
                const drink = R.path(['data', 'drink'], response)
                const getDrinkResponse = await Query(q, { drinkId: response.data.id }); 
                expect(getDrinkResponse.status).to.equal(200)
                expect(drink).to.have.property('id')
                expect(drink).to.have.property('name', drinkName)
                expect(drink).to.have.property('recipe').to.be.instanceOf(Array)
                expect(drink.recipe[0]).to.have.property('ingrediant').to.have.property('name', 'whiskey')
                expect(drink.recipe[0]).to.have.property('quantity', '2oz')
                expect(drink.tags).to.deep.include([mixedDrinkId, whiskeyDrinkId])
            })
        })
    })
})
