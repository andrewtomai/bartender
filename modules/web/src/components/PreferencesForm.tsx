import React from 'react';
import PollOption from './PollOption';
import { Space } from 'antd';

interface Option {
    name: string;
    isSelected: boolean;
}

interface props {
    options: Option[];
    onOptionClick: (option: Option) => void;
}

const PreferencesForm: React.FC<props> = ({ options, onOptionClick }) => {
    return (
        <Space wrap size="middle" style={{ display: 'flex' }}>
            {options.map((option) => (
                <PollOption key={option.name} {...option} onClick={() => onOptionClick(option)} />
            ))}
        </Space>
    );
};

export default PreferencesForm;
