import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Beer from './icons/Beer';

import PollOption from './PollOption';

describe('Poll Option', () => {
    const name = 'my button name';
    describe('Given the button is not selected', () => {
        beforeEach(() => {
            render(<PollOption name={name} icon={Beer} />);
        });
        test('Renders a button with the name', () => {
            expect(screen.getByRole('button', { name })).toBeDefined();
        });
        test('Renders the supplied icon', () => {
            expect(screen.getByRole('img')).toBeDefined();
        });
    });

    describe('Given the button is selected', () => {
        beforeEach(() => {
            render(<PollOption name={name} icon={Beer} isSelected={true} />);
        });
        test('Renders a check icon if it "isSelected"', () => {
            expect(screen.getByRole('img', { name: 'check-circle' })).toBeDefined();
        });
    });
});
