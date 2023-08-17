import { describe, test, expect, vitest } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PreferencesForm from './PreferencesForm';

describe('Preferences Form', () => {
    const options = [
        { name: 'beer', isSelected: false },
        { name: 'wine', isSelected: true },
    ];
    const onOptionClick = vitest.fn();

    describe('Given an array of options', () => {
        beforeEach(() => {
            render(<PreferencesForm options={options} onOptionClick={onOptionClick} />);
        });
        test('Renders a button for each option', () => {
            expect(screen.getByRole('button', { name: 'beer' }));
            expect(screen.getByRole('button', { name: 'check-circle wine' }));
        });
        test('Fires the "onOptionClick" handler when a button is clicked', async () => {
            const beerButton = screen.getByRole('button', { name: 'beer' });
            fireEvent.click(beerButton);
            await waitFor(() => expect(onOptionClick).toBeCalledWith({ name: 'beer', isSelected: false }));
        });
    });
});
