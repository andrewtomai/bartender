import axios, { AxiosResponse } from 'axios';
import url from 'url';
import fs from 'fs';
import { DrinkInput } from '../../../src/generated/graphql-types';
import * as Environment from './Environment';

const readStackFile = () => {
    const stackFile = Environment.stackFile();
    if (!fs.existsSync(stackFile)) {
        console.error('Stack file does not exist for stage: ', Environment.testingStage());
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(stackFile).toString());
};

const baseUrl = () => {
    if (Environment.isLocalTest()) {
        return url.format({
            protocol: 'http',
            hostname: 'localhost',
            port: Environment.port(),
            pathname: `/${Environment.testingStage()}`,
        });
    }
    const stackInfo = readStackFile();
    return stackInfo.ServiceEndpoint;
};

type GraphqlVariables = {
    [prop: string]: unknown;
};

type GraphqlResponse = {
    status: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>;
    errors?: unknown;
};

const graphqlResponse = (axiosResponse: AxiosResponse): GraphqlResponse => ({
    data: axiosResponse.data.data,
    status: axiosResponse.status,
    errors: axiosResponse.data.errors,
});

const query = (graphqlQuery: string, variables?: GraphqlVariables): Promise<GraphqlResponse> => {
    const client = axios.create({
        baseURL: baseUrl(),
        validateStatus: () => true, // do not throw errors on bad responses (outside 200 range)
    });
    return client
        .post('/graphql', {
            query: graphqlQuery,
            variables,
        })
        .then(graphqlResponse);
};

export const createDrink = async ({ name, tags, recipe }: DrinkInput): Promise<GraphqlResponse> => {
    return await query(
        `#graphql
            mutation CreateDrink($drink: DrinkInput!) {
                createDrink(drink: $drink) {
                    id,
                    name,
                    recipe {
                        id,
                        name,
                        quantity
                    },
                    tags {
                        id,
                        name
                    }
                }
            }
        `,
        { drink: { name, tags, recipe } },
    );
};

export default query;
