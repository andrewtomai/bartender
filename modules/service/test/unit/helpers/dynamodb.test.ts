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

    describe('Given I want to calculate expression attribute values for a query', () => {
        describe('When I supply a primary and secondary key, and the main table index ', () => {
            it('Then I get two attribute values', () => {
                const actual = DynamoDB.expressionAttributeValues(
                    { primaryId: 'hello', secondaryId: 'world' },
                    DynamoDB.IndexName.main,
                );
                expect(actual).to.have.property(':sk').deep.equal({ S: 'world' });
                expect(actual).to.have.property(':pk').deep.equal({ S: 'hello' });
            });
        });
        describe('When I supply just a primary key', () => {
            it('Then I get back one attribute value', () => {
                const actual = DynamoDB.expressionAttributeValues({ primaryId: 'hello' }, DynamoDB.IndexName.main);
                expect(actual).to.have.property(':pk').deep.equal({ S: 'hello' });
            });
        });
        describe('When I supply just a secondary key, and the reverseLookup index', () => {
            it('Then I get back one attribute value', () => {
                const actual = DynamoDB.expressionAttributeValues(
                    { secondaryId: 'hello' },
                    DynamoDB.IndexName.reverseLookup,
                );
                expect(actual).to.have.property(':pk').deep.equal({ S: 'hello' });
            });
        });
    });

    describe('Given I want to caclculate a key condition expression', () => {
        describe('When I want to query the reverse lookup, and supply just a secondary id', () => {
            it('Then I get back a single variable key condition expression', () => {
                const actual = DynamoDB.keyExpression({ secondaryId: 'hello' }, DynamoDB.IndexName.reverseLookup);
                expect(actual).to.equal('secondaryId = :pk');
            });
        });
        describe('When I want to query the reverse lookup, I supply a secondary id and a primary id', () => {
            it('Then I get back a two variable key condition expression using the GT operator', () => {
                const actual = DynamoDB.keyExpression(
                    {
                        secondaryId: 'hello',
                        primaryId: 'world',
                    },
                    DynamoDB.IndexName.reverseLookup,
                    DynamoDB.SortKeyOperation.GT,
                );
                expect(actual).to.equal('secondaryId = :pk AND primaryId > :sk');
            });
        });
        describe('When I supply just a secondary id and a primary id, and the BEGINS_WITH operator', () => {
            it('Then I get back a two variable key condition expression using the BEGINS_WITH operator', () => {
                const actual = DynamoDB.keyExpression(
                    {
                        secondaryId: 'hello',
                        primaryId: 'world',
                    },
                    DynamoDB.IndexName.main,
                    DynamoDB.SortKeyOperation.BEGINS_WITH,
                );
                expect(actual).to.equal('primaryId = :pk AND begins_with(secondaryId, :sk)');
            });
        });
    });
});
