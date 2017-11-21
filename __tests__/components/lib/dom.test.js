/* global test, expect */

import * as domLibrary from 'js/lib/dom';

const mockedElement = {
	clientWidth: 150,
	clientHeight: 150,
	getBoundingClientRect: () => {
		return {
			left: 0,
			top: 0
		};
	}
};
const mockedEvent = {
	clientX: 5,
	clientY: 10
};

test('getRelativeCursorPosition', () => {
	const relativePosition = domLibrary.getRelativeCursorPosition(mockedEvent, mockedElement);

	expect(relativePosition).toEqual({ x: 5, y: 10 });
});