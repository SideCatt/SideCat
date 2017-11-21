import Type from 'js/models/core/proptypes/Type';
import InstanceOf from 'js/models/core/proptypes/InstanceOf';

/**
 * InstanceOf class, child to Type, to provide support for the existence of an object that matches the structure of a provided class.
 * @class
 * @property {object} type Object class to match structure against.
 */
class ArrayOf extends Type {
	constructor(type) {
		const validatedtype = type.validate ? type : new InstanceOf(type);

		super(validatedtype);
	}

	getType() {
		return this.type.constructor.name;
	}

	validate(values) {
		return values.every((value) => {
			return this.type.validate(value);
		});
	}
}

export default ArrayOf;