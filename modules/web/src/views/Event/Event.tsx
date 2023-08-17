import './Event.css';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getEventQuery } from '../../helpers/bartender-client';
import EventDescription from '../../components/EventDescription';
import PreferencesForm from '../../components/PreferencesForm';
import useEventStore from './store';
import { Row, Space } from 'antd';

const ColorfulBackgrond = <div data-testid="colorful-background" className="colorful-background"></div>;

const NOT_FOUND_VALUES = {
    name: 'Oh No!',
    description: "we can't find that event...",
};

const EventView: React.FC = () => {
    const { eventId } = useParams();
    const { data, isLoading } = useQuery(['events'], getEventQuery(eventId as string));
    const options = useEventStore((state) => state.options);
    const onOptionClick = useEventStore((state) => state.onOptionClick);

    if (isLoading) return ColorfulBackgrond;

    const { name, description } = data?.event || NOT_FOUND_VALUES;

    return (
        <>
            {ColorfulBackgrond}
            <Space direction="vertical" size="middle" style={{ display: 'grid', alignItems: 'center' }}>
                <EventDescription name={name} description={description} />
                <Row justify="center">
                    <PreferencesForm options={options} onOptionClick={onOptionClick} />
                </Row>
            </Space>
        </>
    );
};

export default EventView;
