import gql from 'graphql-tag';

export type EventInput = {
    name: string;
    description?: string;
};

export type Event = {
    id: string;
} & EventInput;

const defaultRoot = gql`
    type Query {
        event(id: String!): Event
    }
    type Mutation {
        createEvent(event: EventInput!): Event!
    }

    input EventInput {
        name: String!
        description: String
    }

    type Event {
        id: String!
        name: String!
        description: String
    }
`;

const typeDefs = [defaultRoot];

export default typeDefs;
