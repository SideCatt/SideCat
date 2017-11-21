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