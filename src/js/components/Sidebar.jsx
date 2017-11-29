import BaseComponent from 'js/extensions/BaseComponent';
import Categories from 'js/components/sideModules/Categories';
import Checkbox from 'js/components/sideModules/CheckBox';
import Models from 'js/models/index';
import PropTypes from 'prop-types';
import React from 'react';
import { sideCatClassnames } from 'js/lib/css';
import Slider from 'js/components/sideModules/Slider';

class Sidebar extends BaseComponent {
	constructor(props) {
		super(props);
	}

	/**
	 * Renders Categories component based on CategoriesModel
	 * @param   {CategoriesModel} structItem Categories model structure config
	 * @returns {Categories}                 Returns Categories Component
	 */
	renderCategories(structItem) {
		const { handleCategoryChange } = this.props;
		const { active, name, categories } = structItem.serialize();

		return (
			<Categories
				key={ name }
				active={ active }
				categories={ categories }
				onChange={ this.bindParams(handleCategoryChange, name)} />
		);
	}

	/**
	 * Renders checkbox based on CheckBoxModel
	 * @param   {CheckBoxModel} structItem CheckBox model structure configuration
	 * @returns {Checkbox}                 Returns CheckBox Component
	 */
	renderCheckBox(structItem) {
		const { handleCheckBoxChange } = this.props;
		const { label, name } = structItem.serialize();

		return (
			<Checkbox
				key={ name }
				label={ label }
				onChange={ this.bindParams(handleCheckBoxChange, name) } />
		);
	}

	/**
	 * Renders Slider based on SliderModel
	 * @param   {SliderModel} structItem Slider model structure configuration
	 * @returns {Slider}                 Returns Slider Component
	 */
	renderSlider(structItem) {
		const {
			handleSliderDragChange,
			handleSliderDragEnd,
			valueState
		} = this.props;
		const {
			max,
			min,
			name
		} = structItem.serialize();
		const value = valueState[ name ];

		return (
			<Slider
				key={ name }
				max={ max }
				min={ min }
				onDragChange={ this.bindParams(handleSliderDragChange, name) }
				onDragEnd={ this.bindParams(handleSliderDragEnd, name) }
				value={ value } />
		);
	}

	renderSidebarComponents() {
		const { structList } = this.props;

		return structList.map((structItem) => {
			switch (structItem.constructor.Structure) {
				case Models.CategoriesModel.Structure:
					return this.renderCategories(structItem);
				case Models.CheckBoxModel.Structure:
					return this.renderCheckBox(structItem);
				case Models.SliderModel.Structure:
					return this.renderSlider(structItem);
				default:
					break;
			}
		});
	}

	render() {
		const sideBarClass = sideCatClassnames('sidebar');

		return (
			<div className={ sideBarClass }>
				{ this.renderSidebarComponents() }
			</div>
		);
	}
}

/**
 * propTypes definition
 * @property (function} handleCheckBoxChange   Handle checkbox change events
 * @property (function} handleSliderDragChange Handle slider drag change events
 * @property (function} handleSliderDragEnd    Handle slider drag end events
 * @property {array}    structList             Order of sidebar components
 */
Sidebar.propTypes = {
	handleCheckBoxChange: PropTypes.func,
	handleSliderDragChange: PropTypes.func,
	handleSliderDragEnd: PropTypes.func,
	structList: PropTypes.array,
	valueState: PropTypes.object
};

export default Sidebar;