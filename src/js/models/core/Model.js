import SideCatProps from 'js/models/core/SideCatProps';

/**
 * Creates a new Model
 * @class
 * @property {Object} dataStructure Structure defined for the Model
 */
class Model {
	/**
	 * Model will validate the structure upon instantiation
	 * @param {object} dataStructure
	 */
	constructor(dataStructure) {
		try {
			this.validate(dataStructure);

			this.dataStructure = dataStructure;
		}
		catch (error) {
			this.handleValidateError(error);
		}
	}

	/**
	 * Properly throw data structure error due to invalidation
	 * @param {Error} error Error object thrown by validator
	 */
	handleValidateError(error) {
		throw error;
	}

	/**
	 * Validata data structure
	 * @param   {object}  dataStructure Data structure
	 * @returns {boolean}               Returns true if the data structure is valid
	 * @throws  {Error}                 Throws an error with proper messaging if any props don't match
	 */
	validate(dataStructure) {
		return SideCatProps.checkPropTypes(
			Model.Structure,
			dataStructure,
			this.constructor.name
		);
	}

	/**
	 * Serialize incoming value in a way acceptable by the designated data structure
	 * @param  {any} value Value to serialize
	 * @return {any}       Serialized value
	 */
	serialize(value) {
		return value;
	}
}

SideCatProps.defineStructure(Model, {});

export default Model;