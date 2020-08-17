const R = require('ramda')
const response = require('./response')

// Get the request body from a lambda event
// @sig getRequestBody :: (Event) -> Any
const getRequestBody = (event) => {
    try {
        return JSON.parse(R.prop('body', event))
    } catch (err) {
        // parsing error
        throw new response.BadRequest('Request body was un-parsable')
    }
}

module.exports = { getRequestBody }
