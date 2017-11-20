import classnames from 'classnames';
import { SIDE_CAT_CSS } from 'js/constants/CSS';

/**
 * Prepend 'sidecat' to designated name
 * and apply additional arguments to classname function
 * @param   {string} name Name of main class
 * @param   {any}    args Arguments following classnames params structure
 * @returns {string}      CSS classname
 */
export function sideCatClassnames(name, ...args) {
	const sideCatClassName = `${SIDE_CAT_CSS}-${name}`;

	return classnames(sideCatClassName, ...args);
}

/**
 * Generates slider inline CSS properties for sidecat slider components
 * @param {number|string} value value that needs to be converted to inline css strings
 */
export function generateSliderInline(value) {
	const translateValue = `translateX(${value}px)`;
	const knobPosition = {
		MozTransform: translateValue,
		msTransform: translateValue,
		transform: translateValue,
		WebkitTransform: translateValue
	};
	const trackCoverWidth = { width: `${value}px` };

	return { knobPosition, trackCoverWidth };
}