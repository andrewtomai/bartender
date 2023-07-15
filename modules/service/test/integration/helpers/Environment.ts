export const isLocalTest = (): boolean => testingStage() === 'local';

export const testingStage = (): string => process.env.STAGE || 'local';

export const port = (): number => 3000;

export const stackFile = (): string => `./stacks/${testingStage()}.stack.json`;

export const isCITest = (): boolean => !!process.env.CI;

export const shouldStartLocalServer = (): boolean => isCITest() && isLocalTest();
