import * as R from 'ramda';
export const DRINK_ID_PREFIX = 'DRINK#';
export const TAG_ID_PREFIX = 'TAG#';
export const INGREDIANT_ID_PREFIX = 'INGREDIANT#';
export const NAME_ID_PREFIX = 'NAME#';

const extractId = (prefix: string) => (databaseId: string): string => databaseId.split(prefix).join('');

export const extractDrinkId = extractId(DRINK_ID_PREFIX);
export const extractTagId = extractId(TAG_ID_PREFIX);
export const extractIngrediantId = extractId(INGREDIANT_ID_PREFIX);
export const extractNameId = extractId(NAME_ID_PREFIX);

const enrichId = (prefix: string) => (id: string): string => `${prefix}${id}`;

export const enrichDatabaseDrinkId = enrichId(DRINK_ID_PREFIX);
export const enrichDatabaseTagId = enrichId(TAG_ID_PREFIX);
export const enrichDatabaseIngrediantId = enrichId(INGREDIANT_ID_PREFIX);
export const enrichDatabaseNameId = enrichId(NAME_ID_PREFIX);
