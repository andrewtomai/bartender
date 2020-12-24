import { gql } from "apollo-server-lambda";

const DrinkSchema = gql`

    extend type Query {
        drink(id: ID!): Drink
        listDrinks(query: DrinkQuery!): [Drink]!
    }

    extend type Mutation {
        createDrink(drink: DrinkInput!): Drink!
    }

    input DrinkQuery {
        name: String
        tags: [String]
    }

    input DrinkInput {
        name: String!
        recipe: [QuantifiedIngrediantInput]
        tags: [ID]
    }

    input QuantifiedIngrediantInput {
        name: String!
        quantity: String!
    }
    
    type Drink {
        id: ID!
        name: String!
        recipe: [QuantifiedIngrediant]
        tags: [Drink]
    }

    type Ingrediant {
        id: ID!
        name: String!
    }

    type QuantifiedIngrediant {
        id: ID!
        ingrediant: Ingrediant!
        quantity: String!
    }
`


export default DrinkSchema;