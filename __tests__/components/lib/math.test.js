/* global test, expect */

import * as mathLibrary from 'js/lib/math';

test('boundsCheckValue strap a value to its max limit', () => {
	const boundValue = mathLibrary.boundsCheckValue(900, 0, 500);

	expect(boundValue).toEqual(500);
});

test('boundsCheckValue strap a value to its min limit', () => {
	const boundValue = mathLibrary.boundsCheckValue(50, 250, 500);

	expect(boundValue).toEqual(250);
});

test('getIntervalValue should normalize a value to an interval scale of 7 and round 51 to 49', () => {
	const intervalScaled = mathLibrary.getIntervalValue(51, 7);

	expect(intervalScaled).toEqual(49);
});

test('getIntervalValue should normalize a value to an interval scale of 7 and round 54 to 56', () => {
	const intervalScaled = mathLibrary.getIntervalValue(54, 7);

	expect(intervalScaled).toEqual(56);
});

test('translateValueToPosition should translate a normalized value on a scale', () => {
	const translatedValue = mathLibrary.translateValueToPosition(0.5, 150);

	expect(translatedValue).toEqual(75);
});

test('translateValueToPosition should translate a value on a scale with provided max/min', () => {
	const translatedValue = mathLibrary.translateValueToPosition(50, 150, { max: 100 });

	expect(translatedValue).toEqual(75);
});

test('translateValueToPosition should correct an overflow value', () => {
	const translatedValue = mathLibrary.translateValueToPosition(5, 150);

	expect(translatedValue).toEqual(150);
});

test('translateValueToPosition should translate an overflown scale value', () => {
	const translatedValue = mathLibrary.translateValueToPosition(5, 150, { max: 2 });

	expect(translatedValue).toEqual(150);
});

test('translateValueToPosition should translate an underscale value', () => {
	const translatedValue = mathLibrary.translateValueToPosition(5, 150, { max: 100, min: 7 });

	expect(translatedValue).toEqual(0);
});