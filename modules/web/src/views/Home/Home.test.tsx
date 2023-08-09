import { describe, test, expect, vi } from 'vitest';
import { renderWithProviders } from '../../../test/render';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import Home from './Home';
import useHomeStore from './store';

// Mock react router to spy on the navigate function
const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const router = (await vi.importActual('react-router-dom')) as object;
    return { ...router, useNavigate: () => navigate };
});

const fillAndSubmitForm = () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'some name' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Description' }), {
        target: { value: 'some description' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
};

describe('Home Page', () => {
    describe('Given the home view is loaded', () => {
        beforeEach(() => {
            renderWithProviders(<Home />);
        });
        test('Should render the Call to Action', () => {
            expect(screen.getByTestId('cta-component')).toBeDefined();
        });

        test('Should open the create event modal on CTA click', async () => {
            const button = screen.getByRole('button', { name: 'Start' });
            fireEvent.click(button);
            await waitFor(() => expect(screen.getByTestId('create-event-modal')).toBeDefined());
        });
    });

    describe('Given the modal has been opened', async () => {
        const createEventStub = vi.fn();
        beforeEach(async () => {
            useHomeStore.setState({ isModalOpen: true, createEvent: createEventStub });
            renderWithProviders(<Home />);
        });
        test('Should close the modal when clicking off the modal', async () => {
            const closeButton = screen.getByRole('button', { name: 'Close' });
            fireEvent.click(closeButton);
            expect(useHomeStore.getState()).toEqual(expect.objectContaining({ isModalOpen: false }));
        });

        test('Should Create an event when submitting the form', async () => {
            fillAndSubmitForm();
            await waitFor(() =>
                expect(createEventStub).toBeCalledWith({ name: 'some name', description: 'some description' }),
            );
        });
    });

    describe('Given an event has been successfully created', () => {
        beforeEach(async () => {
            useHomeStore.setState({ isModalOpen: true, createEvent: vi.fn().mockResolvedValue('hello') });
            renderWithProviders(<Home />);
            fillAndSubmitForm();
        });

        test('Should navigate to the event view', async () => {
            await waitFor(() => expect(navigate).toHaveBeenCalledWith(`/event/hello`));
        });
    });
});
