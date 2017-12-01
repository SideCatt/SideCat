import Model from 'js/models/core/Model';
import SideCatProps from 'js/models/core/SideCatProps';

/**
 /**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */
class CheckBoxModel extends Model {
	constructor(dataStructure) {
		super(dataStructure);
	}

	validate(dataStructure) {
		return SideCatProps.checkPropTypes(
			CheckBoxModel.Structure,
			dataStructure,
			this.constructor.name
		);
	}
}

/**
 * propTypes Definition
 * @type {string} label Label of checkbox
 * @type {string} name  Name of checkbox
 * @type {*}      value Value specified for the checkbox
 */
SideCatProps.defineStructure(CheckBoxModel, {
	label: SideCatProps.string,
	name: SideCatProps.string,
	value: SideCatProps.any
});

export default CheckBoxModel;