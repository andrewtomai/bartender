import { GraphQLClient } from 'graphql-request';

import url from 'url';
import fs from 'fs';
import * as Environment from './Environment';

const readStackFile = () => {
    const stackFile = Environment.stackFile();
    if (!fs.existsSync(stackFile)) {
        console.error('Stack file does not exist for stage: ', Environment.testingStage());
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(stackFile).toString());
};

const baseUrl = () => {
    if (Environment.isLocalTest()) {
        return url.format({
            protocol: 'http',
            hostname: 'localhost',
            port: Environment.port(),
            pathname: '/',
        });
    }
    const stackInfo = readStackFile();
    return stackInfo.ServiceEndpoint;
};

const client = new GraphQLClient(baseUrl());

export default client;
