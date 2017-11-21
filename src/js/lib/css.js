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
 * Returns object containing a width property and a px sizing as specified by value
 * @param  {number|string} value Size of inline CSS width
 * @return {object}              Object containing modified width value in pixels
 */
export function getWidthStyle(value) {
	return { width: `${value}px` };
}

/**
 * Transforms a string value into an object containing transform CSS
 * @param  {number|string} value Translation distance value
 * @return {object}              Object containing Moz, ms, webkit, and standard transform values
 */
export function generateTranslateXCSS(value) {
	const translateValue = `translateX(${value}px)`;

	return {
		MozTransform: translateValue,
		msTransform: translateValue,
		transform: translateValue,
		WebkitTransform: translateValue
	};
}

/**
 * returns slider inline CSS properties for sidecat slider components
 * @param  {number|string} value Value that needs to be converted to inline css strings
 * @return {object}              Object containing knobPostion (transform properties) and trackCoverWidth (width property)
 */
export function generateSliderInline(value) {
	return {
		knobPosition: generateTranslateXCSS(value),
		trackCoverWidth: getWidthStyle(value)
	};
}