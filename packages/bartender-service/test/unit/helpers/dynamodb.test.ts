import { expect } from 'chai';
import * as R from 'ramda';
import * as DynamoDB from '../../../src/helpers/dynamodb';

describe('Scenario: using dynamodb helpers', () => {
    describe('Given I want to get a dynamodb client configuraiton', () => {
        describe('When I am in the offline environment', () => {
            it('Then I get a client configuration for a local dynamodb instance', () => {
                const expected = {
                    apiVersion: '2012-08-10',
                    region: 'localhost',
                    endpoint: `http://localhost:8000`,
                    accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
                    secretAccessKey: 'DEFAULT_SECRET', // needed if you don't have aws credentials at all in env
                };
                const actual = DynamoDB.clientConfiguration(true);
                expect(actual).to.deep.equal(expected);
            });
        });
        describe('When I am in a deployed environment', () => {
            it('Then I get a client configuration for a deployed environment', () => {
                const expected = { apiVersion: '2012-08-10' };
                const actual = DynamoDB.clientConfiguration(false);
                expect(actual).to.deep.equal(expected);
            });
        });
    });

    describe('Given I want to check the batch size for a batch operation', () => {
        describe('When I check a valid batch of size 12', () => {
            const batch = R.range(0, 12);
            it('Then the batch is not empty', () => expect(DynamoDB.batchIsEmpty(batch)).to.equal(false));
            it('And the batch is not too large', () => expect(DynamoDB.batchIsTooLarge(batch)).to.equal(false));
        });
        describe('When I check a invalid batch of size 0', () => {
            const batch = [];
            it('Then the batch is not empty', () => expect(DynamoDB.batchIsEmpty(batch)).to.equal(true));
            it('And the batch is not too large', () => expect(DynamoDB.batchIsTooLarge(batch)).to.equal(false));
        });
        describe('When I check a invalid batch of size 26', () => {
            const batch = R.range(0, 26);
            it('Then the batch is not empty', () => expect(DynamoDB.batchIsEmpty(batch)).to.equal(false));
            it('And the batch is not too large', () => expect(DynamoDB.batchIsTooLarge(batch)).to.equal(true));
        });
    });
});
