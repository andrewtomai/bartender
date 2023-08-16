import { Button } from 'antd';
import Icon, { CheckCircleOutlined } from '@ant-design/icons';
import React, { ComponentType } from 'react';

interface props {
    name: string;
    icon: ComponentType<unknown>;
    isSelected?: boolean;
}
const PollOption: React.FC<props> = ({ name, icon, isSelected = false }) => (
    <Button icon={isSelected ? <CheckCircleOutlined /> : <Icon component={icon} />}>{name}</Button>
);

export default PollOption;
