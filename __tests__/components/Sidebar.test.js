/* global test, expect, mount */

import Models from 'js/models';
import React from 'react';
import Sidebar from 'js/components/Sidebar';
import renderer from 'react-test-renderer';

test('Sidebar should correctly render components based on structList', () => {
	const structList = [
		new Models.CategoriesModel({
			name: 'category',
			categories: [ new Models.CategoryModel({ value: 'cat1', label: 'Cat One' }) ]
		}),
		new Models.SliderModel({
			label: 'Slider',
			name: 'slider1',
			max: 100,
			min: 0
		}),
		new Models.CheckBoxModel({
			label: 'Bar',
			name: 'bar1'
		})
	];
	const component = renderer.create(
		<Sidebar structList={ structList } />
	);

	let tree = component.toJSON();

	expect(tree).toMatchSnapshot();
});

test('Sidebar\'s prop "onChange" should be able to fire on any events changing from input components', () => {
	const structList = [
		new Models.CategoriesModel({
			name: 'category',
			categories: [ new Models.CategoryModel({ value: 'cat1', label: 'Cat One' }) ]
		}),
		new Models.CheckBoxModel({
			label: 'Bar',
			name: 'bar1',
			value: 'barrr'
		})
	];

	class MockComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				category: null,
				bar1: false
			};
		}

		handleOnChange(name, value) {
			this.setState({
				[ name ]: value
			});
		}

		render() {
			return (
				<Sidebar
					onChange={ this.handleOnChange.bind(this) }
					valueState={ this.state }
					structList={ structList }/>
			);
		}
	}

	const testComponent = mount(<MockComponent/>);

	testComponent.find('div.checkbox').simulate('click');

	expect(testComponent.state('bar1')).toEqual('barrr');
});