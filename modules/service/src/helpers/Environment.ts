// returns truthy if there is an "AWS_LAMBDA_FUNCTION_NAME"
export const isExecutingInLambda = (): string | undefined => process.env.AWS_LAMBDA_FUNCTION_NAME;

// returns truthy if the execution is occurring in serverless-offline
export const isOffline = (): boolean => !!process.env.IS_OFFLINE;

export const tableName = (): string => process.env.TABLE_NAME as string;
