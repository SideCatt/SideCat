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
	if (interval === 1) {
		return value;
	}

	const remainder = value % interval;

	return remainder === 0
		? value
		: (value - remainder) + (interval * Math.round(remainder / interval));
}

/**
 * Translates a value on a scale to a relative pixel value on a scale
 * @param {number} value               Numeric value to be normalized from 0-1.
 * @param {number} scale               Scaling factor to apply to the normalized value
 * @param {number} properties.min      (Optional) Minimum value for the value on a  0
 * @param {number} properties.max      (Optional) Interval step on the scale defaults to 1
 * @param {number} properties.interval (Optional) Interval step on the scale defaults to 1
 */
export function translateValueToPosition(value, scale, properties = {}) {
	const {
		interval = 1,
		max = 1,
		min = 0
	} = properties;
	let relativeValue = boundsCheckValue(value, min, max);

	if (value > 1 && max > 1) {
		const normalizedValue = getIntervalValue(value, interval);

		relativeValue = (normalizedValue - min) / (max - min);
	}

	if (relativeValue > 1) {
		return scale;
	}
	else if (relativeValue < 0) {
		return 0;
	}

	return relativeValue * scale;
}