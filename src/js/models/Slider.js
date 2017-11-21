import Model from 'js/models/extensions/Model';
import PropTypes from 'prop-types';
import Slider from 'js/components/sideModules/Slider';

class SliderModel extends Model {
	constructor(dataStructure) {
		super(dataStructure);
	}


	getMax() {
		return this.data.max;
	}

	getMin() {
		return this.data.min;
	}

	// so on..

	serialize(value) {
		let val = value;

		if (value < this.data.min) {
			val = this.data.min;
		}
		else if (value > this.data.max) {
			val = this.data.max;
		}

		return {
			[ this.data.name ]: val
		};
	}

	validate(dataStructure) {
		PropTypes.checkPropTypes(
			SliderModel.Structure,
			dataStructure,
			'dataStructure',
			'SliderModel'
		);
	}
}

SliderModel.Structure = Object.freeze({
	name: PropTypes.string.isRequired,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired
});

export default SliderModel;


// ------------------------------- Usage in Building Sidebar


const structure = [
	new SliderModel({
		label: 'Quantity (in pounds)',
		min: 0,
		max: 100,
		name: 'quantity'
	})
];

/*
<Sidebar
     dataStructure={ structure }>
 */

// ------------------------------------------- Inside Slider
// buildSidebarComponents() {
structure.map((struct) => {
	switch (struct.Structure) {
		case SliderModel.Structure:
			return ( // I know you have diff props but just for illustration
				<Slider
					onChange={ this.handleChange.bind(struct) }
					min={ struct.getMin() }
					max={ struct.getMax() }
					label={ struct.getLabel() } />
			);
	}
});

// handleChange(struct, value) {
	const updateQuery = struct.serialize(value);

	return Object.assign({}, prevQuery, updateQuery);


	