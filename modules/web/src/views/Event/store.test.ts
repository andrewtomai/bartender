import { describe, test, expect } from 'vitest';
import useEventStore from './store';

describe('Event Store', () => {
    const option = { name: 'my option', isSelected: false };
    beforeEach(() => {
        useEventStore.setState({ options: [option] });
    });
    test('Can switch the "selected" status of an option', () => {
        useEventStore.getState().onOptionClick(option);
        expect(useEventStore.getState()).toEqual(
            expect.objectContaining({
                options: [{ ...option, isSelected: true }],
            }),
        );
    });
});
