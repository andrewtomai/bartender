import { gql } from "apollo-server-lambda";

const RoomSchema = gql`
    extend type Query {
        room(roomId: ID!): Room
    }

    extend type Mutation {
        createRoom(input: RoomInput): Room!
    }

    input RoomInput {
        description: String
    }

    type Room {
        id: ID!
        users: [User]!
        drinks: [Drink]!
        createdAt: String!
        createdBy: User!
        description: String
    }
`


export default RoomSchema;