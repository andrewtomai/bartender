import { gql } from 'apollo-server-lambda';

const RoomSchema = gql`
    extend type Query {
        room(roomId: ID!): Room
    }

    extend type Mutation {
        createRoom(input: RoomInput!): Room!
        deleteRoom(id: ID!): Room
    }

    input RoomInput {
        name: String!
        description: String
    }

    type Room {
        id: ID!
        name: String!
        description: String
        occupants: [Occupant]!
        menu: [Drink]!
        ingrediants: [QuantifiedIngrediant]!
        createdAt: String!
        createdBy: User!
    }
`;

export default RoomSchema;
