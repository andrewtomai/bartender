import { GraphQLClient } from 'graphql-request';

const BASE_URL = 'https://b78lyqv8kd.execute-api.us-west-2.amazonaws.com/';

const client = new GraphQLClient(BASE_URL);

export default client;
