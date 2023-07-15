import { gql } from 'apollo-server-lambda';

const DrinkSchema = gql`
    extend type Query {
        drink(id: UUID!): Drink
        listDrinks(query: DrinkQuery!): [Drink]!
    }

    extend type Mutation {
        createDrink(drink: DrinkInput!): Drink!
    }

    input DrinkQuery {
        name: String
        tags: [String!]
    }

    input DrinkInput {
        name: String!
        recipe: [QuantifiedIngrediantInput!]
        tags: [UUID!]
    }

    input QuantifiedIngrediantInput {
        name: String!
        quantity: String!
    }

    type Drink {
        id: UUID!
        name: String!
        recipe: [QuantifiedIngrediant!]
        tags: [Drink!]
    }

    type Ingrediant {
        id: UUID!
        name: String!
    }

    type QuantifiedIngrediant {
        id: UUID!
        name: String!
        quantity: String!
    }
`;

export default DrinkSchema;
