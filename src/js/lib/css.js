import classnames from 'classnames';
import { SIDE_CAT_CSS } from 'js/constants/CSS';

/**
 * Prepend 'side-cat' to designated name
 * and apply additional arguments to classname function
 * @param   {string} name Name of main class
 * @param   {any}    args Arguments following classnames params structure
 * @returns {string}      CSS classname
 */
export function sideCatClassnames(name, ...args) {
	const sideCatClassName = `${SIDE_CAT_CSS}-${name}`;

	return classnames(sideCatClassName, ...args);
}