import Client from '../helpers/client';
import { CreateDrinkMutation } from './mutations';

describe('Create Drinks', () => {
    describe('Given a name', () => {
        const name = 'beer';
        describe('When I create a drink', () => {
            it('Then I get back that drink', async () => {
                const result = await Client.request(CreateDrinkMutation, { name });
                expect(result).toEqual({
                    createDrink: {
                        id: expect.any(String),
                        name,
                        tags: null,
                        recipe: null,
                    },
                });
            });
        });
    });

    describe('Given a name and some tags', () => {
        const name = 'IPA';
        const tags = ['beer', 'hoppy', 'strong'];
        describe('When I create the drink', () => {
            it('Then I get back that drink', async () => {
                const result = await Client.request(CreateDrinkMutation, { name, tags });
                expect(result).toEqual({
                    createDrink: {
                        id: expect.any(String),
                        name,
                        tags,
                        recipe: null,
                    },
                });
            });
        });
    });

    describe('Given a name and a recipe', () => {
        const name = 'whiskey rocks';
        const recipe = [
            { name: 'whiskey', quantity: 2, unit: 'oz' },
            { name: 'ice', quantity: null, unit: null },
        ];
        describe('When I create the drink', () => {
            it('Then I get back that drink', async () => {
                const result = await Client.request(CreateDrinkMutation, { name, recipe });
                expect(result).toEqual({
                    createDrink: {
                        id: expect.any(String),
                        name,
                        recipe,
                        tags: null,
                    },
                });
            });
        });
    });
});
