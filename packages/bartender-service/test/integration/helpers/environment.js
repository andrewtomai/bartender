const R = require('ramda');

const isLocalTest = () => R.equals(testingStage(), 'local');

const testingStage = () => R.path(['env', 'STAGE'], process);

const port = () => R.pathOr(3000, ['env', 'PORT'], process);

const stackFile = () => `./${testingStage()}.stack.json`;

module.exports = {
    isLocalTest,
    testingStage,
    port,
    stackFile,
};
