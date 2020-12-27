import { expect } from 'chai';
import * as R from 'ramda';
import * as Drink from '../../../src/resolvers/Drink';

describe('Scenario: using drink resolver helpers', () => {
    describe('Given a drink Id', () => {
        const drinkId = 'my drink uuid';
        describe('When I enrich it to create a database key pair', () => {
            it('Then I get a database key pair', () => {
                const actual = Drink.enrichDrinkKeyPair(drinkId);
                expect(actual).to.deep.equal({
                    primaryId: 'DRINK#my drink uuid',
                    secondaryId: 'DRINK#my drink uuid',
                });
            });
        });
    });
    describe('Given a Drink Input', () => {
        const drinkId = 'my uuid';
        const drinkName = 'name';
        describe('When I enrich it with the properties it needs to be written to the database', () => {
            const actual = Drink.enrichInputDrink(drinkId, drinkName);
            it('Then it has a database key pair', () => {
                const expected = {
                    primaryId: 'DRINK#my uuid',
                    secondaryId: 'DRINK#my uuid',
                };
                expect(actual).to.deep.include(expected);
            });
            it('And it has a name', () => expect(actual).to.have.property('name'));
            it('And it has a createdAt timestamp', () => expect(actual).to.have.property('createdAt'));
        });
    });
    describe('Given a Drink Id and a Tag Input', () => {
        const drinkId = 'my drink uuid';
        const tagId = 'my tag uuid';
        describe('When I enrich it with the properties it needs to be written to the database', () => {
            const actual = Drink.enrichInputTags(drinkId)(tagId);
            it('Then it has a database key pair', () => {
                const expected = {
                    primaryId: 'DRINK#my drink uuid',
                    secondaryId: 'TAG#my tag uuid',
                };
                expect(actual).to.deep.include(expected);
            });
        });
    });
    describe('Given a Database Tag', () => {
        const databaseTag = {
            primaryId: 'something',
            secondaryId: 'TAG#my tag id',
        };
        describe('When I format it as a Tag', () => {
            it('Then I get back partial of a Drink', () =>
                expect(Drink.formatTag(databaseTag)).to.deep.equal({
                    id: 'my tag id',
                }));
        });
    });
    describe('Given a Database Drink', () => {
        const databaseDrink = {
            primaryId: 'DRINK#my drink uuid',
            secondaryId: 'DRINK#my drink uuid',
            createdAt: 'some timestamp',
            name: 'my name',
        };
        describe('When I format it without any tags', () => {
            it('Then I get back a Drink', () => {
                const actual = Drink.formatDrink(databaseDrink);
                expect(actual).to.deep.equal({
                    id: 'my drink uuid',
                    name: 'my name',
                    tags: null,
                });
            });
        });
    });
});
