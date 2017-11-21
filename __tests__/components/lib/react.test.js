/* global test, expect */

import * as reactLibrary from 'js/lib/react';

test('findActiveChild finds the active category in a flat category arrangement', () => {
	const testCategories = [
		{ label: 'test1', value: 'test1' },
		{ label: 'test2', value: 'test2' },
		{ label: 'test3', value: 'test3' }
	];
	const activeArray = reactLibrary.findActiveChildren(testCategories, 'test1');
	const expectedCategories = [
		{ active: true, label: 'test1', value: 'test1' },
		{ active: false, label: 'test2', value: 'test2' },
		{ active: false, label: 'test3', value: 'test3' }
	];

	expect(activeArray).toEqual(expectedCategories);
});

test('findActiveChild finds the active category in a nested category arrangement', () => {
	const testingCategory = {
		children: [
			{
				children: [
					{
						label: 'test1child2',
						value: 'test1child2'
					}
				],
				label: 'test1child1',
				value: 'test1child1'
			}
		],
		label: 'test1',
		value: 'test1'
	};
	const expectedCategory = {
		active: true,
		children: [
			{
				active: true,
				children: [
					{
						active: true,
						label: 'test1child2',
						value: 'test1child2'
					}
				],
				label: 'test1child1',
				value: 'test1child1'
			}
		],
		label: 'test1',
		value: 'test1'
	};
	const testCategories = [
		testingCategory,
		{ label: 'test2', value: 'test2' },
		{ label: 'test3', value: 'test3' }
	];
	const activeArray = reactLibrary.findActiveChildren(testCategories, 'test1child2');
	const expectedCategories = [
		expectedCategory,
		{ active: false, label: 'test2', value: 'test2' },
		{ active: false, label: 'test3', value: 'test3' }
	];

	expect(activeArray).toEqual(expectedCategories);
});