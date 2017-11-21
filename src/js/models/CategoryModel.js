import Model from 'js/models/core/Model';
import SideCatProps from 'js/models/core/SideCatProps';

/**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */
class CategoryModel extends Model {
	constructor(dataStructure) {
		super(dataStructure);
	}

	validate(dataStructure) {
		return SideCatProps.checkPropTypes(
			CategoryModel.Structure,
			dataStructure,
			this.constructor.name
		);
	}

	serialize() {
		return Object.assign({}, Model.prototype.serialize.call(this), {
			children: this.serializeChildren(this.dataStructure.children)
		});
	}

	serializeChildren(children) {
		if (!children) {
			return null;
		}

		return children.map((child) => {
			return Object.assign({}, Model.prototype.serialize.call(child), {
				children: this.serializeChildren(child.dataStructure.children)
			});
		});
	}
}

/**
 * propTypes Definition
 * @type {string} label Label of Slider
 * @type {string} name  Name of Slider
 * @type {number} max   Maximum value of slider
 * @type {number} min   Minimum value of slider
 * @type {number} value Optional overridable value
 */
SideCatProps.defineStructure(CategoryModel, {
	label: SideCatProps.string,
	value: SideCatProps.any,
	children: SideCatProps.arrayOf(CategoryModel).isOptional
});

export default CategoryModel;