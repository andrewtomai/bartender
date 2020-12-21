import * as R from 'ramda'

const envOr = (defaultValue: string, variable: string): string => R.pathOr(defaultValue, ['env', variable], process)

// returns truthy if there is an "AWS_LAMBDA_FUNCTION_NAME"
export const isExecutingInLambda = () => process.env.AWS_LAMBDA_FUNCTION_NAME

// returns truthy if the execution is occurring in serverless-offline
export const isOffline = () => process.env.IS_OFFLINE

// The dynamoDb table name to use
export const tableName = () => process.env.TABLE_NAME

export const stage = () => envOr('prod', 'STAGE');

