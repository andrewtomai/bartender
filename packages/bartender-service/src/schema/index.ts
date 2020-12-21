import { gql } from "apollo-server-lambda";

const defaultRoot = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`

const typeDefs = [
    defaultRoot,
];


export default typeDefs;