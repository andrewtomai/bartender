import { create } from 'zustand';

export type HomeStore = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const useHomeStore = create<HomeStore>((set) => ({
    isModalOpen: false,
    openModal: () => set(() => ({ isModalOpen: true })),
    closeModal: () => set(() => ({ isModalOpen: false })),
}));

export default useHomeStore;
