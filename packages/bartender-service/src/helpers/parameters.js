const R = require('ramda');
const response = require('./response');

// Get the request body from a lambda event
// @sig getRequestBody :: (Event) -> Any
const getRequestBody = (event) => {
    try {
        return JSON.parse(R.prop('body', event));
    } catch (err) {
        // parsing error
        throw new response.BadRequest('Request body was un-parsable');
    }
};

// Get a specific path parameter from a lambda event
// @sig getPathParameter :: (Event, parameter) -> String
const getPathParameter = (event, parameter) => R.path(['pathParameters', parameter], event);

module.exports = {
    getRequestBody,
    getPathParameter,
};
