import { gql } from 'apollo-server-lambda';

const UserSchema = gql`
    extend type Query {
        user(userId: ID!): User
        occupant(occupant: OccupantInput!): Occupant
    }

    extend type Mutation {
        createUser(user: UserInput!): User!
        joinRoom(occupant: OccupantInput!): Occupant
        leaveRoom(occupant: OccupantInput!): Occupant
        updatePreferences(occupantId: ID!, preferences: [DrinkPreferenceInput]!): Occupant
    }

    input OccupantInput {
        userId: ID!
        roomId: ID!
    }

    input UserInput {
        name: String!
    }

    input DrinkPreferenceInput {
        id: ID!
    }

    type User {
        id: ID!
        occupancies: [Occupant]!
        name: String!
    }

    type Occupant {
        room: Room!
        user: User!
        prefereces: [Drink]!
    }
`;

export default UserSchema;
