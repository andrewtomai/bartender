import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';

interface props {
    name: string;
    isSelected?: boolean;
}
const PollOption: React.FC<props> = ({ name, isSelected = false }) => (
    <Button icon={isSelected ? <CheckCircleOutlined /> : null}>{name}</Button>
);

export default PollOption;
