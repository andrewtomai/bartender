const { expect } = require('chai')
const snapshot = require('snap-shot-it')
const client = require('../helpers/client')

describe('Get Room', () => {
    it('Returns a room when the roomId exists', async () => {
        const roomId = 'myValidRoomId'
        const response = await client.get(`/room/${roomId}`)
        expect(response.status).to.equal(200)
        snapshot(response.data)
    })
})
