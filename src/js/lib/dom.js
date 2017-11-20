import { getRatioValue } from 'js/lib/math';

/**
 * Get current cursor position relative to the element
 * @param  {object} event   Synthetic Event object
 * @param  {object} element DOM Element
 * @return {object}         X & Y Coordinate relative to the top left corner of the element
 */
export function getRelativeCursorPosition(event, element) {
	const elementCoordinates = element.getBoundingClientRect();
	const { left, top } = elementCoordinates;
	const mouseX = event.clientX - left;
	const mouseY = event.clientY - top;
	const { clientWidth, clientHeight } = element;
	const coordinate = {
		x: mouseX,
		y: mouseY
	};

	if (mouseX > clientWidth) {
		coordinate.x = clientWidth;
	}
	else if (mouseX < 0) {
		coordinate.x = 0;
	}

	if (mouseY > clientHeight) {
		coordinate.y = clientHeight;
	}
	else if (mouseY < 0) {
		coordinate.y = 0;
	}

	return coordinate;
}

/**
 * Get the value from the position the cursor is pointing at
 * @param {object} event            Synthetic Event object
 * @param {object} element          DOM element
 * @param {object} properties       Properties specified to determine the value of the cursor
 * @param {object} properties.max   Maximum value the position can represent
 * @param {object} properties.min   Minimum value the position can represent
 * @param {object} properties.width Width of pixels you want to compare the cursor position from. Defaults to element's client width
 */
export function getElementCursorValue(event, element, properties = {}) {
	const {
		max,
		min,
		width
	} = properties;

	if (!max || !width) {
		return 0;
	}
	const elemWidth = width || element.clientWidth;
	const newPosition = getRelativeCursorPosition(event, element);

	return getRatioValue(newPosition.x, [ min, max ], elemWidth);
}