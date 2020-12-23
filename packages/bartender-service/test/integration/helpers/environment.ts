const R = require('ramda');

const isLocalTest = () => R.equals(testingStage(), 'local');

const testingStage = () => R.path(['env', 'TEST_STAGE'], process);

const port = () => R.pathOr(4000, ['env', 'PORT'], process);

const stackFile = () => `./stacks/${testingStage()}.stack.json`;

module.exports = {
    isLocalTest,
    testingStage,
    port,
    stackFile,
};
