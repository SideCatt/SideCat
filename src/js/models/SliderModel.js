import Model from 'js/models/core/Model';
import SideCatProps from 'js/models/core/SideCatProps';

/**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */
class SliderModel extends Model {
	constructor(dataStructure) {
		super(dataStructure);
	}

	validate(dataStructure) {
		return SideCatProps.checkPropTypes(
			SliderModel.Structure,
			dataStructure,
			this.constructor.name
		);
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
SideCatProps.defineStructure(SliderModel, {
	label: SideCatProps.string,
	name: SideCatProps.string,
	max: SideCatProps.number,
	min: SideCatProps.number,
	value: SideCatProps.number.isOptional
});

export default SliderModel;