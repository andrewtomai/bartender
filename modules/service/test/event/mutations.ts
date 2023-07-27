import gql from 'graphql-tag';

export const CreateEventMutation = gql`
    mutation CreateEvent($name: String!, $description: String) {
        createEvent(event: { name: $name, description: $description }) {
            id
            name
            description
        }
    }
`;
