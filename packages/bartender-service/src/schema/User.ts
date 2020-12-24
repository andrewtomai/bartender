import { gql } from 'apollo-server-lambda';

const UserSchema = gql`
    extend type Query {
        user(userId: UUID!): User
        occupant(occupant: OccupantInput!): Occupant
    }

    extend type Mutation {
        createUser(user: UserInput!): User!
        joinRoom(occupant: OccupantInput!): Occupant
        leaveRoom(occupant: OccupantInput!): Occupant
        updatePreferences(occupantId: UUID!, preferences: [DrinkPreferenceInput]!): Occupant
    }

    input OccupantInput {
        userId: UUID!
        roomId: UUID!
    }

    input UserInput {
        name: String!
    }

    input DrinkPreferenceInput {
        id: UUID!
    }

    type User {
        id: UUID!
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
