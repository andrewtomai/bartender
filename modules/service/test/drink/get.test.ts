import Client from '../helpers/client';
import gql from 'graphql-tag';
import { CreateDrinkMutation } from './mutations';

const GetDrinkQuery = gql`
    query GetDrink($id: String!) {
        drink(id: $id) {
            id
            name
        }
    }
`;

type CreateDrinkResult = {
    createDrink: {
        id: string;
    };
};

describe('Drinks', () => {
    describe('Given an invalid ID', () => {
        const id = 'my id';
        describe('When I get a drink', () => {
            it('Then I get back "null"', async () => {
                const result = await Client.request(GetDrinkQuery, { id });
                expect(result).toEqual({ drink: null });
            });
        });
    });

    describe('Given a drink has been created', () => {
        let id: string;
        const name = 'beer';
        beforeAll(async () => {
            const result: CreateDrinkResult = await Client.request(CreateDrinkMutation, { name });
            id = result.createDrink.id;
        });

        describe('When I get the drink by ID', () => {
            it('Then I get back the drink', async () => {
                const result = await Client.request(GetDrinkQuery, { id });
                expect(result).toEqual({ drink: { id: expect.any(String), name } });
            });
        });
    });
});
