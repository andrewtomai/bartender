const { v4: uuid } = require('uuid');
const { Response, Parameters, Integration } = require('../helpers');
const { DynamoDb } = require('../helpers/client');

const createRoom = async (event) => {
    // unwrap event
    const body = Parameters.getRequestBody(event);
    const { roomName, dateRange } = body;
    // calculate a random room Id, to be stored and returned
    const roomId = uuid();
    // put a room record in dynamodb
    await DynamoDb.putRoom({
        roomId,
        roomName,
        dateRange,
    });
    // return a 200 response including the roomId
    return Response.Ok({
        roomId,
        roomName,
        dateRange,
    });
};

module.exports = { createRoom: Integration.WRAP_LAMBDA_EXECUTION(createRoom) };
