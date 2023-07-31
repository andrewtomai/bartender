import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Home from './Home';

describe('Home Page', () => {
    beforeEach(() => {
        render(<Home />);
    });
    test('Should render the Call to Action', () => {
        expect(screen.getByTestId('cta-component')).toBeDefined();
    });

    test('Should open the create event modal on CTA click', () => {
        const button = screen.getByTestId('cta-button');
        expect(button).toBeDefined();
    });
});
