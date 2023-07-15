import Client from './helpers/client';
import gql from 'graphql-tag';

const GetDrinkQuery = gql`
    query GetDrink($id: String!) {
        drink(id: $id) {
            name
        }
    }
`;

describe('Drinks', () => {
    describe('Given an ID', () => {
        const id = 'my id';
        describe('When I get a drink', () => {
            it('Then I get back "null"', async () => {
                const result = await Client.request(GetDrinkQuery, { id });
                expect(result).toEqual({ drink: null });
            });
        });
    });
});
