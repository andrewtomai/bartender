import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import CallToAction from './CallToAction';

const myCallback = vi.fn();

const getCtaButton = () => screen.getByTestId('cta');

describe('Create Event Form', () => {
    beforeEach(() => {
        render(<CallToAction onCallToActionClick={myCallback} />);
    });
    test('Should have the bartneder logo', () => {
        expect(screen.getByAltText('bartender website logo')).toBeDefined();
    });
    test('Should have a short description of the website', () => {
        expect(screen.getByTestId('description')).toBeDefined();
    });
    test('Should have a call to action button', () => {
        expect(getCtaButton()).toBeDefined();
    });
    test('Should call the callback on CTA button click', async () => {
        fireEvent.click(getCtaButton());
        await waitFor(() => expect(myCallback).toHaveBeenCalledOnce());
    });
});
