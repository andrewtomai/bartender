// returns truthy if there is an "AWS_LAMBDA_FUNCTION_NAME"
const isExecutingInLambda = () => process.env.AWS_LAMBDA_FUNCTION_NAME

// returns truthy if the execution is occurring in serverless-offline
const isOffline = () => process.env.IS_OFFLINE

// The dynamoDb table name to use
const tableName = () => process.env.TABLE_NAME

module.exports = {
    isExecutingInLambda,
    isOffline,
    tableName,
};
