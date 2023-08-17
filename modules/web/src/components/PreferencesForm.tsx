import React from 'react';
import PollOption from './PollOption';
import { Space } from 'antd';

export interface Option {
    name: string;
    isSelected: boolean;
}

interface props {
    options: Option[];
    onOptionClick: (option: Option) => void;
}

const PreferencesForm: React.FC<props> = ({ options, onOptionClick }) => {
    return (
        <Space wrap size="middle" style={{ justifyContent: 'center' }}>
            {options.map((option) => (
                <PollOption key={option.name} {...option} onClick={() => onOptionClick(option)} />
            ))}
        </Space>
    );
};

export default PreferencesForm;
