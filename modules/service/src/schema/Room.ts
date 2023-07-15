import { gql } from 'apollo-server-lambda';

const RoomSchema = gql`
    extend type Query {
        room(roomId: UUID!): Room
    }

    extend type Mutation {
        createRoom(input: RoomInput!): Room!
        deleteRoom(id: UUID!): Room
    }

    input RoomInput {
        name: String!
        description: String
    }

    type Room {
        id: UUID!
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
