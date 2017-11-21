import Type from 'js/models/core/proptypes/Type';

/**
 * OneOfType class, child to Type, to provide support for the existence of a matching type array.
 * @class
 * @property {array} types Array of Type classes
 */
class OneOfType extends Type {
	constructor(types) {
		super(types);
	}

	getType() {
		return this.types.reduce((prev, next) => `${prev.getType()} ${next.getType()}`, '');
	}

	validate(value) {
		return this.type.some((type) => type.validate(value));
	}
}

export default OneOfType;