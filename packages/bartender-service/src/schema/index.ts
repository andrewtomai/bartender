import { gql } from "apollo-server-lambda";
import RoomSchema from './Room'
import UserSchema from './User'
import DrinkSchema from './Drink'

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
    RoomSchema,
    UserSchema,
    DrinkSchema,
];


export default typeDefs;