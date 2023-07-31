import { create } from 'zustand';
import BartenderClient from '../../helpers/bartender-client';
import { gql } from 'graphql-request';
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
    createEvent: (values: CreateEventFormInputs) => void;
};

const useHomeStore = create<HomeStore>((set) => ({
    isModalOpen: false,
    isFormLoading: false,
    openModal: () => set(() => ({ isModalOpen: true })),
    closeModal: () => set(() => ({ isModalOpen: false })),
    createEvent: async ({ name, description }) => {
        set(() => ({ isFormLoading: true }));
        const result = await BartenderClient.request(CreateEventMutation, { name, description });
        console.log(result);
        set(() => ({ isFormLoading: false, isModalOpen: false }));
    },
}));

export default useHomeStore;
