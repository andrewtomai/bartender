// graphql.js
import { ApolloServer } from 'apollo-server-lambda';
import * as Environment from './helpers/Environment';
import resolvers from './resolvers';
import typeDefs from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: { endpoint: `/${Environment.stage()}/graphql` },
});

export const graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});

export const ping = async (): Promise<Record<string, unknown>> => ({
    body: JSON.stringify({ message: 'ping' }),
    isBase6eEncoded: false,
    statusCode: 200,
    headers: {},
});
