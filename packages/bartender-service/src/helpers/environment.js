const isExecutingInLambda = () => process.env.AWS_LAMBDA_FUNCTION_NAME;

const isOffline = () => process.env.IS_OFFLINE;

module.exports = {
    isExecutingInLambda,
    isOffline,
};
