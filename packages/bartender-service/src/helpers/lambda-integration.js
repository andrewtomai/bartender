const response = require('./response');

// A simple Lambda Function wrapper for redundant logging and error handling
// @sig WRAP_LAMBDA_EXECUTION :: (Function) -> (Event, Context) -> Response
const WRAP_LAMBDA_EXECUTION = (lambdaFunction) => async (event, context) => {
    try {
        return await lambdaFunction(event, context);
    } catch (executionError) {
        if (executionError.isError) {
            // this was an internally thrown error. attach meta data, and return
            return response.attachMetaData(context, executionError);
        }
        // this is a runtime error
        const error = response.InternalServerError('Unknown error occurred');
        return response.attachMetaData(context, error);
    }
};

module.exports = { WRAP_LAMBDA_EXECUTION };
