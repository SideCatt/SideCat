import Type from 'js/models/core/proptypes/Type';

/**
 * InstanceOf class, child to Type, to provide support for the existence of an object that matches the structure of a provided class.
 * @class
 * @property {object} type Object class to match structure against.
 */
class InstanceOf extends Type {
	constructor(type) {
		super(type);
	}

	getType() {
		return this.type.name;
	}

	validate(value) {
		const typeKeys = this.type.prototype ? Object.getOwnPropertyNames(this.type.prototype) : Object.keys(this.type);

		if (!value || !value.constructor || this.getType() !== value.constructor.name) {
			return false;
		}

		for (let i = 0; i < typeKeys.length; i++) {
			const prop = typeKeys[ i ];

			if (!value[ prop ]) {
				return false;
			}
		}

		return true;
	}
}

export default InstanceOf;