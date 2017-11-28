/* eslint-disable no-use-before-define */

import { TYPES } from 'js/constants/TYPES';
import ArrayOf from 'js/models/core/proptypes/ArrayOf';
import InstanceOf from 'js/models/core/proptypes/InstanceOf';
import OneOfType from 'js/models/core/proptypes/OneOfType';
import ramdaGetType from 'ramda/src/type';
import Type from 'js/models/core/proptypes/Type';

/**
 * Return a frozen Type object
 * @param   {string} type Name of type
 * @returns {Type}        Frozen Type object from the given param
 */
function getArrayValidator(types) {
	const validators = new ArrayOf(types);

	return Object.freeze(validators);
}

function getTypeValidator(type) {
	const typeValidator = new Type(type);

	return Object.freeze(typeValidator);
}

function getInstanceValidator(instance) {
	const typeValidator = new InstanceOf(instance);

	return Object.freeze(typeValidator);
}

function getMultipleValidators(...types) {
	const validators = new OneOfType(types);

	return Object.freeze(validators);
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

		const actualType = ramdaGetType(value);
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
		value: Object.freeze(structure)
	});
};

// Define types
SideCatProps.any = { validate: () => true };
SideCatProps.array = getTypeValidator(TYPES.ARRAY);
SideCatProps.bool = getTypeValidator(TYPES.BOOL);
SideCatProps.func = getTypeValidator(TYPES.FUNC);
SideCatProps.number = getTypeValidator(TYPES.NUMBER);
SideCatProps.object = getTypeValidator(TYPES.OBJECT);
SideCatProps.string = getTypeValidator(TYPES.STRING);
SideCatProps.instanceOf = getInstanceValidator;
SideCatProps.oneOf = getMultipleValidators;
SideCatProps.arrayOf = getArrayValidator;

export default Object.freeze(SideCatProps);