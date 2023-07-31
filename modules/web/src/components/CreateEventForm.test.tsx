import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import CreateEventForm from './CreateEventForm';

const getNameInput = () => screen.getByTestId('name-input');

const getDescriptionInput = () => screen.getByTestId('description-input');

const getSubmitButton = () => screen.getByTestId('submit-button');

const myCallback = vi.fn();

describe('Create Event Form', () => {
    describe('Given the form is not "loading"', () => {
        beforeEach(() => {
            render(<CreateEventForm onFinish={myCallback} />);
        });
        test('Should have a name text box', () => {
            expect(screen.getByText(/Name/i)).toBeDefined();
            expect(getNameInput()).toBeDefined();
        });

        test('Should have a description text box', () => {
            expect(screen.getByText(/Description/i)).toBeDefined();
            expect(getDescriptionInput()).toBeDefined();
        });

        test('Should have a submission button', () => {
            expect(screen.getByText(/Create Event/i)).toBeDefined();
            expect(getSubmitButton()).toBeDefined();
        });

        test('Should be able to fill out the form', async () => {
            const name = 'my test name';
            const description = 'my test description';
            const nameInput = getNameInput();
            const descriptionInput = getDescriptionInput();
            const submitButton = getSubmitButton();
            fireEvent.change(nameInput, { target: { value: name } });
            fireEvent.change(descriptionInput, { target: { value: description } });
            fireEvent.click(submitButton);
            await waitFor(() => expect(myCallback).toHaveBeenCalledOnce());
            expect(myCallback).toHaveBeenCalledWith({ name, description });
        });
    });
});