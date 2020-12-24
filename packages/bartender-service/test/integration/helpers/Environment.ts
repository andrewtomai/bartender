const R = require('ramda');

export const isLocalTest = () => R.equals(testingStage(), 'local');

export const testingStage = () => R.path(['env', 'TEST_STAGE'], process);

export const port = () => R.pathOr(4000, ['env', 'PORT'], process);

export const stackFile = () => `./stacks/${testingStage()}.stack.json`;
