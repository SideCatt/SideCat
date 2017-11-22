/* eslint-disable no-use-before-define */

import isNil from 'ramda/src/isNil';
import getType from 'ramda/src/type';
import { TYPES } from 'js/constants/TYPES';

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
		return getType(value) === this.type;
	}

	/**
	 * Returns decorated OptionalType object to check for nil values
	 * @returns {OptionalType} OptionalType object
	 */
	get isOptional() {
		return new OptionalType(this.type);
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
			: Type.prototype.validate.call(this, value);
	}
}

/**
 * Return a frozen Type object
 * @param   {string} type Name of type
 * @returns {Type}        Frozen Type object from the given param
 */
function getTypeValidator(type) {
	const typeValidator = new Type(type);

	return Object.freeze(typeValidator);
}

const SideCatProps = {};

/**
 * Validate all the props and its value type
 * @param {Object}   structure     Pre-defined structure configuration
 * @param {Model}    dataStructure Instantiated model object
 * @param {string}   modelName     Name of model
 * @returns {boolean}
 */
SideCatProps.checkPropTypes = function (structure, dataStructure, modelName) {
	return Object.keys(structure).every((propKey) => {
		const validator = structure[ propKey ];
		const value = dataStructure[ propKey ];

		if (validator.validate(value)) {
			return true;
		}

		const actualType = getType(value);
		const expectedType = validator.getType();

		throw new Error(`Invalid \`${modelName}\` structure: type ${actualType} supplied to \`${propKey}\`, expected ${expectedType}.`);
	});
};

/**
 * Assign "Structure" property to the modelClass, defined by given structure
 * @param {Model}  modelClass Model Class
 * @param {Object} structure  Structure configuration
 */
SideCatProps.defineStructure = function (modelClass, structure) {
	Object.defineProperty(modelClass, 'Structure', {
		writable: false,
		value: Object.freeze(structure)
	});
};

// Define types
SideCatProps.any = () => true;
SideCatProps.array = getTypeValidator(TYPES.ARRAY);
SideCatProps.bool = getTypeValidator(TYPES.BOOL);
SideCatProps.func = getTypeValidator(TYPES.FUNC);
SideCatProps.number = getTypeValidator(TYPES.NUMBER);
SideCatProps.object = getTypeValidator(TYPES.OBJECT);
SideCatProps.string = getTypeValidator(TYPES.STRING);

export default Object.freeze(SideCatProps);