import * as R from 'ramda';

export const isLocalTest = (): boolean => R.equals(testingStage(), 'local');

export const testingStage = (): string => R.path(['env', 'STAGE'], process);

export const port = (): number => 3000;

export const stackFile = (): string => `./stacks/${testingStage()}.stack.json`;

export const isCITest = (): boolean => !!process.env.CI;

export const shouldStartLocalServer = (): boolean => isCITest() && isLocalTest();
