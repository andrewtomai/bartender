const R = require('ramda')
const { expect } = require('chai')
const snapshot = require('snap-shot-it')
const client = require('../helpers/client')

describe('Create Room', () => {
    it('Creates a room', async () => {
        const response = await client.post('/room', {
            roomTitle: 'my room title',
            dateRange: ['2020-08-16T17:53:32-07:00'],
        })
        expect(response.status).to.equal(200)
        expect(response.data).to.have.property('roomId').with.length(36)
        snapshot(R.dissoc('roomId', response.data))
    })
})
