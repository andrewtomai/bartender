import * as R from 'ramda';

const envOr = (defaultValue: string, variable: string): string => R.pathOr(defaultValue, ['env', variable], process);

// returns truthy if there is an "AWS_LAMBDA_FUNCTION_NAME"
export const isExecutingInLambda = (): string | undefined => process.env.AWS_LAMBDA_FUNCTION_NAME;

// returns truthy if the execution is occurring in serverless-offline
export const isOffline = (): boolean => !!process.env.IS_OFFLINE;

// The dynamoDb table name to use
export const tableName = (): string => envOr('', 'BARTENDER_TABLE_NAME');

// The stage at which this service is deployed
export const stage = (): string => envOr('prod', 'STAGE');

// The reverse lookup index
export const reverseLookup = (): string => envOr('', 'REVERSE_LOOKUP_INDEX');
