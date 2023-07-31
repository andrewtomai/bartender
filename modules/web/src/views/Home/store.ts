import { create } from 'zustand';
import { CreateEventFormInputs } from '../../components/CreateEventForm';

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
    createEvent: async () => {
        set(() => ({ isFormLoading: true }));
        await new Promise((r) => setTimeout(r, 3000));
        set(() => ({ isFormLoading: false, isModalOpen: false }));
    },
}));

export default useHomeStore;
