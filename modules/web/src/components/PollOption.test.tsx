import { describe, test, expect, vitest } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PollOption from './PollOption';

describe('Poll Option', () => {
    const name = 'my button name';
    const onClick = vitest.fn();
    describe('Given the button is not selected', () => {
        beforeEach(() => {
            render(<PollOption name={name} onClick={onClick} />);
        });
        test('Renders a button with the name', () => {
            expect(screen.getByRole('button', { name })).toBeDefined();
        });
        test('Fires the onClick handler when clicked', async () => {
            const button = screen.getByRole('button');
            fireEvent.click(button);
            await waitFor(() => expect(onClick).toHaveBeenCalled());
        });
    });

    describe('Given the button is selected', () => {
        beforeEach(() => {
            render(<PollOption name={name} isSelected={true} onClick={onClick} />);
        });
        test('Renders a check icon if it "isSelected"', () => {
            expect(screen.getByRole('img', { name: 'check-circle' })).toBeDefined();
        });
    });
});
