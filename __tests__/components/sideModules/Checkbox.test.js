/* global test, expect */
// Checkbox.test.js

import React from 'react';
import Checkbox from 'js/components/sideModules/Checkbox';
import renderer from 'react-test-renderer';

test('Checkbox changes the class when it is checked by default', () => {
	const component = renderer.create(
		<Checkbox label='foo' defaultChecked={ true } />
	);

	let tree = component.toJSON();

	expect(tree).toMatchSnapshot();
});