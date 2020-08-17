const { Response, Parameters, Integration } = require('../helpers')
const { DynamoDb } = require('../helpers/client')

const getRoom = async (event) => {
    // get the roomId
    const roomId = Parameters.getPathParameter(event, 'roomId')
    // get a room record from dynamodb
    const roomItem = await DynamoDb.getRoom(roomId)
    // return a 200 response including the roomId
    return Response.Ok(roomItem);
}

module.exports = { getRoom: Integration.WRAP_LAMBDA_EXECUTION(getRoom) };
