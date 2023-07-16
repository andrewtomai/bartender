import gql from 'graphql-tag';

export const CreateDrinkMutation = gql`
    mutation CreateDrink($name: String!, $tags: [String!], $recipe: [QuantifiedIngredientInput!]) {
        createDrink(drink: { name: $name, tags: $tags, recipe: $recipe }) {
            id
            name
            tags
            recipe {
                name
                quantity
                unit
            }
        }
    }
`;
