import { GraphQLClient, gql } from 'graphql-request';

const BASE_URL = 'https://b78lyqv8kd.execute-api.us-west-2.amazonaws.com/';

interface Event {
    id: string;
    name: string;
    description?: string;
}

export interface EventResponse {
    event: Event | null;
}

const client = new GraphQLClient(BASE_URL);

const GetEventQuery = gql`
    query GetEvent($id: String!) {
        event(id: $id) {
            id
            name
            description
        }
    }
`;

export const getEventQuery = (id: string) => () => client.request<EventResponse>(GetEventQuery, { id });

export default client;
