const response = require('../helpers/response');

const getRoom = async () => response.Ok({ hello: 'world' })

module.exports = { getRoom };
