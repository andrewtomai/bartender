import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PollOption from './PollOption';

describe('Poll Option', () => {
    const name = 'my button name';
    describe('Given the button is not selected', () => {
        beforeEach(() => {
            render(<PollOption name={name} />);
        });
        test('Renders a button with the name', () => {
            expect(screen.getByRole('button', { name })).toBeDefined();
        });
    });

    describe('Given the button is selected', () => {
        beforeEach(() => {
            render(<PollOption name={name} isSelected={true} />);
        });
        test('Renders a check icon if it "isSelected"', () => {
            expect(screen.getByRole('img', { name: 'check-circle' })).toBeDefined();
        });
    });
});
