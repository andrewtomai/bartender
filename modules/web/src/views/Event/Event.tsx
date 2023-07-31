import React from 'react';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

import BartenderClient from '../../helpers/bartender-client';
import { useParams } from 'react-router-dom';

export interface Event {
    id: string;
    name: string;
    description?: string;
}

const GetEventQuery = gql`
    query GetEvent($id: String!) {
        event(id: $id) {
            id
            name
            description
        }
    }
`;

const getEvent = (id: string) => () => BartenderClient.request(GetEventQuery, { id });

const EventView: React.FC = () => {
    const { eventId } = useParams();
    const { data } = useQuery(['events'], getEvent(eventId as string));

    return <p>{JSON.stringify(data)}</p>;
};

export default EventView;
