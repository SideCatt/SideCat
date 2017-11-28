/* eslint-disable no-use-before-define */

import isNil from 'ramda/src/isNil';
import ramdaGetType from 'ramda/src/type';

/**
 * Creates a new Type class with the ability to validate value of its type
 * @class
 * @property {string} type Name of type
 */
class Type {
	constructor(type) {
		this.type = type;
	}

	/**
	 * Get type name
	 * @returns {string} Name of type
	 */
	getType() {
		return this.type;
	}

	/**
	 * Validate the value against its type. Returns true if matched
	 * @param   {any}     value Value to be compared
	 * @returns {boolean}       Indicator if the types match
	 */
	validate(value) {
		return ramdaGetType(value) === this.type;
	}

	/**
	 * Returns decorated OptionalType object to check for nil values
	 * @returns {OptionalType} OptionalType object
	 */
	get isOptional() {
		return new OptionalType(this);
	}
}

/**
 * Decorated OptionalType class to return true for nil values
 * @class
 * @property {string} type Name of type
 */
class OptionalType extends Type {
	constructor(type) {
		super(type);
	}

	validate(value) {
		return isNil(value)
			? true
			: this.type.validate(value);
	}
}

export default Type;