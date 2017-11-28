import Model from 'js/models/core/Model';
import CategoryModel from 'js/models/CategoryModel';
import SideCatProps from 'js/models/core/SideCatProps';

/**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */
class CategoriesModel extends Model {
	constructor(dataStructure) {
		super(dataStructure);
	}

	validate(dataStructure) {
		return SideCatProps.checkPropTypes(
			CategoriesModel.Structure,
			dataStructure,
			this.constructor.name
		);
	}

	serialize() {
		return Object.assign({}, Model.prototype.serialize.call(this), {
			categories: this.dataStructure.categories.map((cat) => cat.serialize())
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
SideCatProps.defineStructure(CategoriesModel, {
	categories: SideCatProps.arrayOf(CategoryModel),
	name: SideCatProps.string
});

export default CategoriesModel;