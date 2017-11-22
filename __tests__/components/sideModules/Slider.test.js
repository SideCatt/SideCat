/* global test, expect */
// Checkbox.test.js

import React from 'react';
import Slider from 'js/components/sideModules/Slider';
import renderer from 'react-test-renderer';

test('Slider changes the slider position when it is passed a value', () => {
	const component = renderer.create(
		<Slider label='foo' value={ 50 } />
	);

	let tree = component.toJSON();

	expect(tree).toMatchSnapshot();
});