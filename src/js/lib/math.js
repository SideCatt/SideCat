/**
 * Get the value as applied to a ratio scaling factor.
 * @param  {number} value Numeric value to be scaled to ratio
 * @param  {array}  range Range of min and max values allowed within the ratio
 * @param  {number} width Pixel width of screen range
 * @return {number}       Proportionally represented value on the range
 */
export function getRatioValue(value, range, width) {
	if (!range || !range[ 1 ] || !value) {
		return 0;
	}
	else if (value < range[ 0 ]) {
		return 0;
	}
	console.log(value);
	console.log(range);

	const ratioAdjusted = value - range[ 0 ];
	const ratio = ratioAdjusted / width;
	console.log(ratio, Math.round(ratio * width));

	if (ratio > 1) {
		return width;
	}

	return Math.round(ratio * width);
}

/**
 * Bounds check a value
 * @param  {number} value    Current value
 * @param  {number} minValue Minimum possible value
 * @param  {number} maxValue Maximum possible value
 * @return {number}          Bounds checked value
 */
export function boundsCheckValue(value = 0, minValue = 0, maxValue = 0) {
	if (!value || !maxValue) {
		return 0;
	}

	if (value < minValue) {
		return minValue;
	}

	if (value > maxValue) {
		return maxValue;
	}

	return value;
}

/**
 * Get the next value based on the value given and the interval the value should go by
 * @param  {number} value    Value to determine the next interval value
 * @param  {number} interval Incrementing step size
 * @return {number}          Next vlue reflecting on the interval given
 */
export function getIntervalValue(value, interval) {
	const remainder = value % interval;

	return remainder === 0
		? value
		: (value - remainder) + (interval * Math.round(remainder / interval));
}