import { expect } from 'chai';
import * as R from 'ramda';
import * as Ingrediant from '../../../src/resolvers/Ingrediant';

describe('Scenario: using ingrediant resolver helpers', () => {
    describe('Given an Ingrediant Input', () => {
        const ingrediantName = 'whiskey';
        const ingrediantId = 'my id';
        describe('When I enrich it such that it can be written to the database', () => {
            const actual = Ingrediant.enrichInputIngrediant(ingrediantId, ingrediantName);
            it('Then It has a database key pair', () => {
                expect(actual).to.deep.include({
                    primaryId: 'INGREDIANT#my id',
                    secondaryId: 'NAME#whiskey',
                });
            });
            it('And it has a name', () => expect(actual).to.have.property('name', 'whiskey'));
        });
    });
    describe('Given a Quantified Ingrediant Input', () => {
        const drinkId = 'my drink id';
        const ingrediantId = 'my ingrediant id';
        const name = 'whiskey';
        const quantity = '2oz';
        describe('When I enrich it such that it can be written to the database', () => {
            const actual = Ingrediant.enrichQuantifiedInputIngrediant(drinkId, ingrediantId, name, quantity);
            it('Then it has a database key pair', () => {
                expect(actual).to.deep.include({
                    primaryId: 'DRINK#my drink id',
                    secondaryId: 'INGREDIANT#my ingrediant id',
                });
            });
            it('And it has a quantity', () => expect(actual).to.have.property('quantity', '2oz'));
        });
    });

    describe('Given an Ingrediant name', () => {
        const ingrediantName = 'my name';
        describe('When I calculate the reverse lookup to find the ingrediant with that name', () => {
            const actual = Ingrediant.reverseLookupKey(ingrediantName);
            it('Then I get back a database key', () => {
                expect(actual).to.deep.equal({
                    secondaryId: 'NAME#my name',
                    primaryId: 'INGREDIANT#',
                });
            });
        });
    });

    describe('Given a drinkId and an index of existing Ingrediants', () => {
        const drinkId = 'drink id';
        const existingIndex = {
            whiskey: 'whiskey id',
        };
        describe('When I calculate the database items required to represent 2oz of an existing ingrediant', () => {
            it('Then I get back one database item', () => {
                const actual = Ingrediant.ingrediantItemsToWrite(
                    drinkId,
                    existingIndex,
                )({ name: 'whiskey', quantity: '2oz' });
                expect(actual).to.deep.equal([
                    {
                        primaryId: 'DRINK#drink id',
                        secondaryId: 'INGREDIANT#whiskey id',
                        quantity: '2oz',
                        name: 'whiskey',
                    },
                ]);
            });
        });
        describe('When I calculate the database items required to represent 1oz of a non-existing ingrediant', () => {
            it('Then I get back two database items', () => {
                const actual = Ingrediant.ingrediantItemsToWrite(
                    drinkId,
                    existingIndex,
                )({ name: 'whiskey sour mix', quantity: '1oz' });
                const [actualQuantifiedIngrediant, actualIngrediant] = actual;
                expect(actualQuantifiedIngrediant).to.deep.include({
                    primaryId: 'DRINK#drink id',
                    quantity: '1oz',
                });
                expect(actualQuantifiedIngrediant)
                    .to.have.property('secondaryId')
                    .satisfies((x) => x.startsWith('INGREDIANT#'));
                expect(actualIngrediant).to.deep.include({
                    secondaryId: 'NAME#whiskey sour mix',
                    name: 'whiskey sour mix',
                });
                expect(actualIngrediant)
                    .to.have.property('primaryId')
                    .satisfies((x) => x.startsWith('INGREDIANT#'));
            });
        });
    });
});
