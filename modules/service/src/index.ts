import { ApolloServer } from '@apollo/server';

import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import typeDefs from './schema';

const resolvers = {
    Query: {
        drink: () => null,
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
