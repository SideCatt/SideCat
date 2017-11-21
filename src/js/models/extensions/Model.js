import PropTypes from 'prop-types';

class Model {
	constructor(dataStructure) {
		this.dataStructure = null;

		try {
			this.validate(dataStructure);

			this.dataStructure = dataStructure;
		}
		catch (error) {
			this.handleError(error);
		}
	}

	/**
	 * Validata data structure
	 * @param   {object}  dataStructure Data structure
	 * @returns {boolean}               Returns true if the data structure is valid
	 */
	validate(dataStructure) {
		PropTypes.checkPropTypes(Model.Structure, dataStructure, 'dataStructure', 'Model');
	}

	/**
	 * Properly throw data structure error due to invalidation
	 * @param   {Error} dataStructError Data structure
	 */
	handleError(dataStructError) {
		throw dataStructError; // Do something
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

Model.Structure = Object.freeze({});

export default Model;