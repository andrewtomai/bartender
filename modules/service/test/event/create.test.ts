import Client from '../helpers/client';
import { CreateEventMutation } from './mutations';

const createEventTest = (name, description) =>
    it('Then I getback that event', async () => {
        const result = await Client.request(CreateEventMutation, { name, description });
        expect(result).toEqual({
            createEvent: {
                id: expect.any(String),
                name,
                description,
            },
        });
    });

describe('Create Events', () => {
    describe('Given a name', () => {
        const name = 'my super cool party';
        describe('When I create an event', () => {
            createEventTest(name, null);
        });
    });

    describe('Given a name and descirption', () => {
        const name = 'my dope event';
        const description = 'this is the coolest event to ever exist';
        describe('When I create an event', () => {
            createEventTest(name, description);
        });
    });
});
