import React from 'react';
import { Typography, Row } from 'antd';

interface props {
    name: string;
    description: string;
}

const EventDescription: React.FC<props> = ({ name, description }) => (
    <>
        <Row justify="center">
            <Typography.Title>{name}</Typography.Title>
        </Row>
        <Row justify="center">
            <Typography.Title level={4}>{description}</Typography.Title>
        </Row>
    </>
);

export default EventDescription;
