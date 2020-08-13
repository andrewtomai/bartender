const axios = require('axios')
const url = require('url')
const fs = require('fs')
const environment = require('./environment')

const readStackFile = () => {
    const stackFile = environment.stackFile();
    if (!fs.existsSync(stackFile)) {
        console.error('Stack file does not exist for stage: ', environment.testingStage());
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(stackFile));
};

const baseUrl = () => {
    if (environment.isLocalTest()) {
        return url.format({
            protocol: 'http',
            hostname: 'localhost',
            port: environment.port(),
            pathname: '/dev',
        });
    }
    const stackInfo = readStackFile();
    return stackInfo.ServiceEndpoint;
};


const client = axios.create({
    baseURL: baseUrl(),
    timeout: 5000,
    validateStatus: null, // do not throw errors on bad responses (outside 200 range)
});

module.exports = client;
