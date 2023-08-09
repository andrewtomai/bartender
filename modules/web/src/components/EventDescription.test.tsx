import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import EventDescription from './EventDescription';

describe('Event Description', () => {
    describe('Given a name and a description', () => {
        const name = 'my event name';
        const description = 'my event description';
        beforeEach(() => {
            render(<EventDescription name={name} description={description} />);
        });
        test('Renders the name as a header', () => {
            expect(screen.getByText(description)).toBeDefined();
        });
        test('Renders the description as a sub-header', () => {
            expect(screen.getByText(description)).toBeDefined();
        });
    });
});
