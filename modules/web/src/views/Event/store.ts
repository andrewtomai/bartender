import { create } from 'zustand';
import * as R from 'ramda';
import { Option } from '../../components/PreferencesForm';

const DEFAULT_OPTIONS = [
    { name: 'Beer', isSelected: false },
    { name: 'Wine', isSelected: false },
    { name: 'Cocktail', isSelected: false },
    { name: 'Seltzer', isSelected: false },
    { name: 'No Alcohol', isSelected: false },
];

export interface EventStore {
    options: Option[];
    onOptionClick: (option: Option) => void;
}

const useEventStore = create<EventStore>((set) => ({
    options: DEFAULT_OPTIONS,
    onOptionClick: (option) =>
        set(({ options }) => {
            const idx = R.findIndex(R.propEq(option.name, 'name'), options);
            const newOptions = R.over(R.lensPath([idx, 'isSelected']), R.not, options);
            return { options: newOptions };
        }),
}));

export default useEventStore;
