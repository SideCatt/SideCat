class SliderModel {
	/**
	 * Slider model construction handles input properties for the sidebar JSX component.
	 * Utilizes XOR comparison (via ternary) on labels and values to enforce user uses consistent
	 * parameter types.
	 * @param {array|string} labels     Label / labels that are associated with the sliders in the module
	 * @param {array}        values     Value pairings for the slider should be 2 element arrays for min/max values
	 * @param {object}       properties Object to overwrite default properties of a slider
	 */
	constructor(labels, values, properties) {
		const defaultProperties = {
			showKnob: true,
			showCover: true
		};
		const multipleLabels = Array.isArray(labels);
		const multipleValueSets = values.length > 2;
		let error = multipleLabels ? !multipleValueSets : multipleValueSets;

		if (multipleValueSets) {
			for (let set of values) {
				// This is not an exhaustive test of broken array inputs
				if (!Array.isArray(set)) {
					error = true;
					break;
				}
			}
		}

		if (error) {
			// do something
		}

		if (multipleLabels && multipleValueSets) {
			this.labels = labels;
			this.values = values;
		}
		else {
			this.labels = [ labels ];
			this.values = [ values ];
		}

		if (Array.isArray(properties) && properties.length === this.labels.length) {
			this.properties = properties.map(function (props) {
				return Object.assign({}, defaultProperties, props);
			});
		}
		else {
			// Do a map to return an array of properties mapped to the labels
			// If this were a spatial issue we could just use a lookup function that utilized a map
			// returning a default value on non specified unique properties
			this.properties = this.labels.map(function () { 
				return Object.assign({}, defaultProperties, properties);
			});
		}
	}
}

export default SliderModel;