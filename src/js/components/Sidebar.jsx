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
		const { onCategoryChange, onChange } = this.props;
		const { active, name, categories } = structItem.serialize();
		const changeFunc = onCategoryChange || onChange;

		return (
			<Categories
				key={ name }
				active={ active }
				categories={ categories }
				onChange={ this.bindParams(changeFunc, name)} />
		);
	}

	/**
	 * Renders checkbox based on CheckBoxModel
	 * @param   {CheckBoxModel} structItem CheckBox model structure configuration
	 * @returns {Checkbox}                 Returns CheckBox Component
	 */
	renderCheckBox(structItem) {
		const { onChange, onCheckBoxChange } = this.props;
		const { label, name, value } = structItem.serialize();
		const changeFunc = onCheckBoxChange || onChange;

		return (
			<Checkbox
				key={ name }
				label={ label }
				value={ value }
				onChange={ this.bindParams(changeFunc, name) } />
		);
	}

	/**
	 * Renders Slider based on SliderModel
	 * @param   {SliderModel} structItem Slider model structure configuration
	 * @returns {Slider}                 Returns Slider Component
	 */
	renderSlider(structItem) {
		const {
			onChange,
			onSliderDragChange,
			onSliderDragEnd,
			valueState
		} = this.props;
		const {
			max,
			min,
			name
		} = structItem.serialize();
		const value = valueState[ name ];
		const endFunc = onSliderDragEnd || onChange;

		return (
			<Slider
				key={ name }
				max={ max }
				min={ min }
				onDragChange={ this.bindParams(onSliderDragChange, name) }
				onDragEnd={ this.bindParams(endFunc, name) }
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
 * @property {function} onCategoryChange   Handle category change events
 * @property {function} onChange           Handle change event for any input changes
 * @property {function} onCheckBoxChange   Handle checkbox change events
 * @property {function} onSliderDragChange Handle slider drag change events
 * @property {function} onSliderDragEnd    Handle slider drag end events
 * @property {array}    structList         Order of sidebar components
 */
Sidebar.propTypes = {
	onCategoryChange: PropTypes.func,
	onChange: PropTypes.func,
	onCheckBoxChange: PropTypes.func,
	onSliderDragChange: PropTypes.func,
	onSliderDragEnd: PropTypes.func,
	structList: PropTypes.array.isRequired,
	valueState: PropTypes.object
};

Sidebar.defaultProps = {
	valueState: {}
};

export default Sidebar;