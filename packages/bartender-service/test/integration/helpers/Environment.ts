import * as R from 'ramda';

export const isLocalTest = (): boolean => R.equals(testingStage(), 'local');

export const testingStage = (): string => R.path(['env', 'TEST_STAGE'], process);

export const port = (): number => R.pathOr(4000, ['env', 'PORT'], process);

export const stackFile = (): string => `./stacks/${testingStage()}.stack.json`;
