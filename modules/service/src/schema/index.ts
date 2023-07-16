import gql from 'graphql-tag';

const quantifiedIngredientFields = `#graphql
    name: String!
    quantity: Float
    unit: String
`;

const defaultRoot = gql`
    type Query {
        drink(id: String!): Drink
    }

    type Mutation {
        createDrink(drink: DrinkInput!): Drink!
    }

    input QuantifiedIngredientInput {
        ${quantifiedIngredientFields}
    }

    type QuantifiedIngredient {
        ${quantifiedIngredientFields}
    }

    input DrinkInput {
        name: String!
        recipe: [QuantifiedIngredientInput!]
        tags: [String!]
    }

    type Drink {
        id: String!
        name: String!
        recipe: [QuantifiedIngredient!]
        tags: [String!]
    }
`;

const typeDefs = [defaultRoot];

export default typeDefs;
