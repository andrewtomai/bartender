const R = require('ramda');
// Given a JSON object response body, and options, returns a lambda proxy integration response.
// @sig response :: (Object, { statusCode: 200, isBase64Encoded: false, isError: undefined, headers: {} }) -> Response
const response = (body, options) => {
    const statusCode = R.propOr(200, 'statusCode', options);
    const isBase64Encoded = R.propOr(false, 'isBase64Encoded', options);
    const headers = addDefaultHeaders(R.propOr({}, 'headers', options));
    const isError = R.prop('isError', options);
    return { body: JSON.stringify(body), statusCode, isBase64Encoded, headers, isError };
};
// add the default CORS and content type headers to the response
// @sig addDefaultHeaders :: (Object) -> Object
const addDefaultHeaders = (headers) => ({
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Type,Location',
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    ...headers,
});
// Given a response body and options, return the a 200 response
// @sig Ok :: (Object, Object) -> Response
const Ok = (body, options) => response(body, { ...options, statusCode: 200 });
// Given a statusCode and Error Type, return a function for creating error responses of a certain type.
// @sig :: (Number, String) -> (String, Object) -> Response
const NotOk = (statusCode, type) => (message, options) =>
    response({ error: { message, type } }, { ...options, statusCode, isError: true });
// Given a message and options, return an Internal Server Error Response
// @sig InternalServerError :: (String, Object) -> Response
const InternalServerError = NotOk(500, 'Internal Server Error');
// Given a message and options, return an Bad Request Response
// @sig BadRequest :: (String, Object) -> Response
const BadRequest = NotOk(400, 'Bad Request');
// Given a message and options, return an Not Found Response
// @sig NotFound :: (String, Object) -> Response
const NotFound = NotOk(404, 'Not Found');
// Given a message and options, return an Forbidden Response
// @sig Forbidden :: (String, Object) -> Response
const Forbidden = NotOk(403, 'Forbidden');
// Given a request context and a response, attach meta data to the response body.
// @sig attachMetaData :: (AwsRequestContext, Response) -> Response
const attachMetaData = (context, responseIn) => {
    const error = R.prop('error', JSON.parse(responseIn.body));
    const requestId = R.prop('awsRequestId', context);
    const date = new Date().toISOString();
    return { ...R.dissoc('isError', responseIn), body: JSON.stringify({ error: { ...error, requestId, date } }) };
};
module.exports = {
    Ok,
    InternalServerError,
    BadRequest,
    NotFound,
    Forbidden,
    attachMetaData,
};
