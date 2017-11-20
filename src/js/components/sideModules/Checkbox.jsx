import React from 'react';
import BaseComponent from 'js/extensions/BaseComponent';
import PropTypes from 'prop-types';
import { sideCatClassnames } from 'js/lib/css';

class Checkbox extends BaseComponent {
	constructor(props) {
		super(props);
		const { defaultChecked } = this.props;

		this.state = {
			checked: defaultChecked
		};

		this.bindMethods('handleChange');
	}

	handleChange(event) {
		const { onChange } = this.props;
		const { checked } = this.state;
		const nextChecked = !checked;

		this.setState({ checked: nextChecked });

		if (onChange) {
			onChange(nextChecked, event);
		}
	}

	renderLabel() {
		const { label } = this.props;

		if (label) {
			return <label>{ label }</label>;
		}
	}

	render() {
		const { disabled } = this.props;
		const { checked } = this.state;
		const checkboxClassnames = sideCatClassnames('checkbox', {
			checked,
			disabled
		});

		return (
			<div className={ checkboxClassnames }>
				<input
					checked={ checked }
					disabled={ disabled }
					onChange={ this.handleChange }
					type='checkbox' />

				{ this.renderLabel() }
			</div>
		);
	}
}

/**
 * propTypes definition
 * @type {boolean}  defaultChecked Indicator to default checked state
 * @type {boolean}  disabled       Indicator to if checkbox is disabled
 * @type {string}   label          Label of checkbox
 * @type {function} onChange       On change handler
 */
Checkbox.propTypes = {
	defaultChecked: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func
};

Checkbox.defaultProps = {
	defaultChecked: false,
	disabled: false
};

export default Checkbox;