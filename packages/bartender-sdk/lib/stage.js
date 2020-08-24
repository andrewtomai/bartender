const LOCAL = 'local'
const DEV = 'dev'
const STAGING = 'STAGING'
const PROD = 'PROD'
const stages = [LOCAL, DEV, STAGING, PROD]

const BASE_URLS = {
    [LOCAL]: 'http://localhost:3000/local',
    [DEV]: 'https://xumq0vw17j.execute-api.us-west-2.amazonaws.com/dev',
    // [STAGING]: '',
    // [PROD]: '',
}

const isValidStage = (stage) => stages.includes(stage)

const baseUrlForStage = (stage) => BASE_URLS[stage]

module.exports = {
    LOCAL,
    DEV,
    STAGING,
    PROD,

    isValidStage,
    baseUrlForStage,
}
