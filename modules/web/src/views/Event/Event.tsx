import './Event.css';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getEventQuery } from '../../helpers/bartender-client';
import EventDescription from '../../components/EventDescription';

const ColorfulBackgrond = <div data-testid="colorful-background" className="colorful-background"></div>;

const NOT_FOUND_VALUES = {
    name: 'Oh No!',
    description: "we can't find that event...",
};

const EventView: React.FC = () => {
    const { eventId } = useParams();
    const { data, isLoading } = useQuery(['events'], getEventQuery(eventId as string));

    if (isLoading) return ColorfulBackgrond;

    const { name, description } = data?.event || NOT_FOUND_VALUES;

    return (
        <>
            {ColorfulBackgrond}
            <EventDescription name={name} description={description} />
        </>
    );
};

export default EventView;
