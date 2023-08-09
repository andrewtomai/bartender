import { create } from 'zustand';
import { Event } from '../../helpers/bartender-client';
import { gql } from 'graphql-request';

import BartenderClient from '../../helpers/bartender-client';
import { CreateEventFormInputs } from '../../components/CreateEventForm';

export const CreateEventMutation = gql`
    mutation CreateEvent($name: String!, $description: String) {
        createEvent(event: { name: $name, description: $description }) {
            id
            name
            description
        }
    }
`;

export type HomeStore = {
    isModalOpen: boolean;
    isFormLoading: boolean;
    openModal: () => void;
    closeModal: () => void;
    createEvent: (values: CreateEventFormInputs) => Promise<string>;
};

const useHomeStore = create<HomeStore>((set) => ({
    isModalOpen: false,
    isFormLoading: false,
    openModal: () => set(() => ({ isModalOpen: true })),
    closeModal: () => set(() => ({ isModalOpen: false })),
    createEvent: async ({ name, description }) => {
        set(() => ({ isFormLoading: true }));
        const result: { createEvent: Event } = await BartenderClient.request(CreateEventMutation, {
            name,
            description,
        });
        set(() => ({ isFormLoading: false, isModalOpen: false }));
        return result.createEvent.id;
    },
}));

export default useHomeStore;
