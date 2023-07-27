import gql from 'graphql-tag';
import Client from '../helpers/client';
import { CreateEventMutation } from './mutations';
import { Event } from '../../src/schema';

const GetEventQuery = gql`
    query GetEvent($id: String!) {
        event(id: $id) {
            id
            name
            description
        }
    }
`;

describe('Get Events', () => {
    describe('Given an event has been created', () => {
        const name = 'my super cool name';
        const description = 'my super cool description';
        let id: string;
        beforeAll(async () => {
            const result: { createEvent: Event } = await Client.request(CreateEventMutation, { name, description });
            ({ id } = result.createEvent);
        });
        describe('When I get the event', () => {
            it('Then I get back the event', async () => {
                const result = await Client.request(GetEventQuery, { id });
                expect(result).toEqual({
                    event: {
                        id,
                        name,
                        description,
                    },
                });
            });
        });
    });
});
