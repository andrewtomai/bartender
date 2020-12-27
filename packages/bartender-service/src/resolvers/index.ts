import GraphQLUUID from 'graphql-type-uuid';

import * as Drink from './Drink';

// Provide resolver functions for your schema fields
const resolvers = {
    Query: { drink: Drink.drinkResolver },
    Mutation: { createDrink: Drink.createDrinkResolver },
    UUID: GraphQLUUID,
    Drink: {
        tags: Drink.tagsForDrinkResolver,
    },
};

export default resolvers;
