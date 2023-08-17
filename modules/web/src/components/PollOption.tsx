import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';

interface props {
    name: string;
    isSelected?: boolean;
    onClick: React.MouseEventHandler<HTMLElement>;
}
const PollOption: React.FC<props> = ({ name, isSelected = false, onClick }) => (
    <Button block onClick={onClick} icon={isSelected ? <CheckCircleOutlined /> : null}>
        {name}
    </Button>
);

export default PollOption;
