import { gql } from "apollo-server-lambda";

const UserSchema = gql`
    extend type Query {
        user(userId: ID!): User
        occupant(occupant: OccupantInput!): Occupant
    }

    extend type Mutation {
        createUser(user: UserInput!): User!
        joinRoom(occupant: OccupantInput!): Occupant
        leaveRoom(occupant: OccupantInput!): Occupant
        updatePreferences(occupantId: ID!, preferences: [Drink]!): Occupant
    }

    input OccupantInput {
        userId: ID!
        roomId: ID!
    }

    input UserInput {
        name: String!
    }

    type User {
        id: ID!
        occupancies: [Occupanct]!
        name: String!
    }

    type Occupanct {
        room: Room!
        user: User!
        prefereces: [Drink]!
    }

`


export default UserSchema;