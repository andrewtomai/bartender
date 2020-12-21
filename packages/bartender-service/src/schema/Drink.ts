import { gql } from "apollo-server-lambda";

const DrinkSchema = gql`
    type Drink {
        id: ID!
        name: String!
    }
`


export default DrinkSchema;