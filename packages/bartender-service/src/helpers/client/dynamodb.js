// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk')
const R = require('ramda')
const { Environment, Response } = require('..')

const ROOM_ITEM_TYPE = 'room'

const getClient = () => Environment.isOffline()
    ? new AWS.DynamoDB({
        dynamodb: '2012-08-10',
        region: 'localhost',
        endpoint: `http://localhost:8000`,
    })
    : new AWS.DynamoDB({ dynamodb: '2012-08-10' })

// This method puts an item to dynamodb
// @sig putItem :: (Object) -> Promise
const putItem = (data) => {
    const dynamoDb = getClient()
    const params = {
        Item: AWS.DynamoDB.Converter.marshall(data),
        TableName: Environment.tableName(),
    }
    return dynamoDb.putItem(params).promise()
}

// This method gets an item from dynamodb
// @sig getITem :: (Keys) -> Item
const getItem = async (keys) => {
    const dynamoDb = getClient()
    const params = {
        Key: AWS.DynamoDB.Converter.marshall(keys),
        TableName: Environment.tableName(),
    }
    const { Item } = await dynamoDb.getItem(params).promise()
    if (Item) return AWS.DynamoDB.Converter.unmarshall(Item)
    throw Response.NotFound('RoomId not found')
}

// This method puts a room item to dynamodb.
// @sig putRoom :: (Room) -> Promise()
const putRoom = async (data) => {
    const primaryId = R.prop('roomId', data)
    const secondaryId = ROOM_ITEM_TYPE
    return putItem({ ...data, primaryId, secondaryId })
}

// This method gets a room item from dynamodb
// @sig getRoom : (roomId) -> Room
const getRoom = async (roomId) => {
    const primaryId = roomId
    const secondaryId = ROOM_ITEM_TYPE
    const item = await getItem({ primaryId, secondaryId })
    return R.omit(['primaryId', 'secondaryId'], item)
}

module.exports = {
    putRoom,
    getRoom,
}
