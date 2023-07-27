import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import { createId } from '@paralleldrive/cuid2';

import typeDefs, { Event, EventInput } from './schema';
import { getObject, putObject } from './helpers/dynamodb';

const resolvers = {
    Query: {
        event: async (_, { id }) => {
            const event = await getObject<Event>(id, id);
            return event;
        },
    },
    Mutation: {
        createEvent: async (_, { event }: { event: EventInput }) => {
            const id = createId();
            await putObject<Event>(id, id, { id, ...event });
            return { id, ...event };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    // We will be using the Proxy V2 handler
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
