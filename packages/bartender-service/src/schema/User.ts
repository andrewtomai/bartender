import { gql } from "apollo-server-lambda";

const UserSchema = gql`
    extend type Query {
        user(userId: ID!): User
    }

    extend type Mutation {
        createUser(input: UserInput): User!
        joinRoom(input: OccupancyInput!): User
        leaveRoom(input: OccupancyInput!): User
    }

    input OccupancyInput {
        userId: ID!
        roomId: ID!
    }

    input UserInput {
        name: String!
    }

    type User {
        id: ID!
        rooms: [Room]!
        name: String!
    }
`


export default UserSchema;