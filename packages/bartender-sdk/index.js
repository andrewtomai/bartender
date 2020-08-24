const BartenderService = require('./lib/BartenderService')

const client = (config) => new BartenderService(config)

module.exports = client
