/* global test, expect, mount */
// Checkbox.test.js

import React from 'react';
import Checkbox from 'js/components/sideModules/CheckBox';
import renderer from 'react-test-renderer';

test('Checkbox changes the class when it is checked by default', () => {
	const component = renderer.create(
		<Checkbox label='foo' checked={ true } />
	);

	let tree = component.toJSON();

	expect(tree).toMatchSnapshot();
});

test('Checkbox\'s parent component can override the checked state', () => {
	class MockComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = { checked: false };
			this.changeChecked = this.changeChecked.bind(this);
		}

		changeChecked() {
			this.setState({ checked: true });
		}

		render() {
			return (
				<a onClick={ this.changeChecked }>
					<Checkbox label='foo' checked={ this.state.checked } />
				</a>
			);
		}
	}

	const test = mount(<MockComponent />);

	test.find('a').simulate('click');

	expect(test.find('.sidecat-checkbox').hasClass('checked')).toBe(true);
});