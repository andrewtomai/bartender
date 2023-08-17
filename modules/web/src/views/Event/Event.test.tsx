import { describe, test, expect, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import * as BartenderClient from '../../helpers/bartender-client';
import { renderWithProviders } from '../../../test/render';

import Event from './Event';

const event = {
    id: 'my event id',
    name: 'my event name',
    description: 'my event description',
};

const params = { eventId: event.id };
vi.mock('react-router-dom', async () => {
    const router = (await vi.importActual('react-router-dom')) as object;
    return { ...router, useParams: () => params };
});

describe('Event View', () => {
    describe('Given an event id in the URL parameters', () => {
        beforeEach(() => {
            vi.spyOn(BartenderClient, 'getEventQuery').mockReturnValue(async () => ({
                event,
            }));
            renderWithProviders(<Event />);
        });
        test('Should render a colorful background', () => {
            expect(screen.getByTestId('colorful-background')).toBeDefined();
        });

        test('Should fetch the event from the backend', () => {
            expect(BartenderClient.getEventQuery).toHaveBeenCalledWith(event.id);
        });

        test('Should render the Event name, description, and preference form', async () => {
            expect(await screen.findByText(event.name)).toBeDefined();
            expect(await screen.findByText(event.description)).toBeDefined();
            expect(await screen.findAllByRole('button')).toBeDefined();
        });
        test('Should be able to click any of the buttons', async () => {
            const [button] = await screen.findAllByRole('button');
            fireEvent.click(button);
            expect(await screen.findByRole('img', { name: 'check-circle' })).toBeDefined();
        });
    });

    describe('Given the event does not exist', () => {
        beforeEach(() => {
            vi.spyOn(BartenderClient, 'getEventQuery').mockReturnValue(async () => ({
                event: null,
            }));
            renderWithProviders(<Event />);
        });

        test('Should render an error message', async () => {
            await waitFor(() => expect(screen.getByText(/Oh No/)).toBeDefined());
        });
    });
});
