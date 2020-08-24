const { expect } = require('chai')
const { Validate, Client } = require('./helpers')

describe('Room APIs', () => {
    describe('#Create Room', () => {
        it('Creates a room given a title and date range', async () => {
            const response = await Client.post('/room', {
                roomName: 'my room title',
                dateRange: ['2020-08-16T17:53:32-07:00'],
            })
            const { data, status } = response
            expect(status).to.equal(200)
            Validate.roomResposne(data)
        })
    })

    describe('#Get Room', () => {
        let createdRoomId
        before('Create a room to retrieve', async () => {
            const response = await Client.post('/room', {
                roomName: 'my room title',
                dateRange: ['2020-08-16T17:53:32-07:00'],
            })
            expect(response.status).to.equal(200)
            createdRoomId = response.data.roomId
        })

        it('Gets a room given a valid roomId', async () => {
            const response = await Client.get(`/room/${createdRoomId}`)
            const { data, status } = response
            expect(status).to.equal(200)
            Validate.roomResposne(data)
        })

        it('Responds with a 404 error when given an invalid roomId', async () => {
            const response = await Client.get(`/room/does-not-exist`)
            const { data, status } = response
            expect(status).to.equal(404)
            Validate.errorResponse(data)
        })
    })
})
