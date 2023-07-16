import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import { createId } from '@paralleldrive/cuid2';

import typeDefs from './schema';
import { getObject, putObject } from './helpers/dynamodb';

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

type DrinkInput = {
    name: string;
    tags: string[];
    recipe: Ingredient[];
};

type Drink = {
    id: string;
} & DrinkInput;

const resolvers = {
    Query: {
        drink: async (_, { id }) => getObject(id, id),
    },
    Mutation: {
        createDrink: async (_, { drink }: { drink: DrinkInput }) => {
            const id = createId();
            await putObject<Drink>(id, id, { id, ...drink });
            return { id, ...drink };
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
