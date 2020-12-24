import * as Drink from './Drink'
// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
      drink: Drink.drinkResolver,
    },
    Mutation: {
      createDrink: Drink.createDrinkResolver
    }
  };

export default resolvers;
