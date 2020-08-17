const { expect } = require('chai')

const errorResponse = (data) => {
    expect(data).to.have.property('error')
    const { error } = data
    expect(error).to.have.property('date')
    expect(error).to.have.property('message')
    expect(error).to.have.property('requestId')
    expect(error).to.have.property('type')
}

const roomResposne = (data) => {
    expect(data).to.have.property('roomId')
    expect(data).to.have.property('roomTitle')
    expect(data).to.have.property('dateRange')
}

module.exports = { errorResponse, roomResposne }
