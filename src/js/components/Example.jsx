/* global console */
/* eslint-disable no-console, camelcase */

// import Categories from 'js/components/sidemodules/Categories';
import BaseComponent from 'js/extensions/BaseComponent';
import Models from 'js/models';
import React from 'react';
import Sidebar from 'js/components/Sidebar';

const nestedCategories = [
	new Models.CategoryModel({
		value: 'category1',
		label: 'Sam and Jon are the best',
		children: [
			new Models.CategoryModel({
				value: 'category1child1',
				label: 'Better than the rest',
				children: [
					new Models.CategoryModel({ value: 'category1child2sibling1', label: '100 100 100 100' }),
					new Models.CategoryModel({ value: 'category1child2sibling2', label: 'ez mode' })
				]
			})
		]
	}),
	new Models.CategoryModel({ value: 'category2', label: '#1 baby' })
];
const flatCategories = [
	new Models.CategoryModel({ value: 'category1', label: 'Sam and Jon are the best' }),
	new Models.CategoryModel({ value: 'category2', label: 'Better than the rest' })
];

const categoryOne = new Models.CategoriesModel({
	name: 'cat1',
	categories: flatCategories
});

const categoryTwo = new Models.CategoriesModel({
	name: 'cat2',
	categories: nestedCategories
});

const CheckBoxFoo = new Models.CheckBoxModel({
	label: 'foo',
	name: 'foo'
});
const SliderOne = new Models.SliderModel({
	label: 'foo slider',
	name: 'foo_slider',
	max: 100,
	min: 0
});
const SliderTwo = new Models.SliderModel({
	label: 'bar slider',
	name: 'bar_slider',
	max: 100,
	min: 0
});

const checkBoxHandler = (name, checked) => {
	console.log(name, checked);
};

const sliderDragChangeHandler = (name, value) => {
	console.log(name, value);
};

const sliderDragEndHandler = (name, value) => {
	console.log(name, value);
};

const structList = [
	CheckBoxFoo,
	SliderOne,
	SliderTwo,
	categoryOne,
	categoryTwo
];

export default class Example extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			bar_slider: 50
		};
		this.bindMethods('setValueTest');
	}

	setValueTest() {
		this.setState({
			bar_slider: 100
		});
	}

	render() {
		return (
			<div className='sidecat-container'>
				<button onClick={ this.setValueTest }> Test slider value passing </button>
				<Sidebar
					handleCheckBoxChange={ checkBoxHandler }
					handleSliderDragChange={ sliderDragChangeHandler }
					handleSliderDragEnd={ sliderDragEndHandler }
					structList={ structList }
					valueState={ this.state }/>

			</div>
		);
	}
}