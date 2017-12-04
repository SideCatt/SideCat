import React from 'react';
import BaseComponent from 'js/extensions/BaseComponent';
import PropTypes from 'prop-types';
import { sideCatClassnames } from 'js/lib/css';

/**
 * @typedef {React.Component} CheckBox
 */
class CheckBox extends BaseComponent {
	constructor(props) {
		super(props);
		const { checked } = this.props;

		this.state = { checked };
		this.bindMethods('handleChange');
	}

	componentWillReceiveProps(nextProps) {
		const { checked: prevChecked } = this.props;
		const { checked: nextChecked } = nextProps;

		if (prevChecked !== nextChecked) {
			this.setState({
				checked: nextChecked
			});
		}
	}

	handleChange(event) {
		const {
			disabled,
			onChange,
			value
		} = this.props;

		if (disabled) {
			return;
		}

		const { checked } = this.state;
		const nextChecked = !checked;
		const val = nextChecked && value ? value : nextChecked;

		this.setState({ checked: nextChecked });

		if (onChange) {
			onChange(val, event);
		}
	}

	renderCheckInput() {
		const { checked } = this.state;

		return (
			<div className='checkbox' onClick={ this.handleChange }>
				{ checked && <div className='check' /> }
			</div>
		);
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
				{ this.renderCheckInput() }
				{ this.renderLabel() }
			</div>
		);
	}
}

/**
 * propTypes definition
 * @property {boolean}  checked   Overridable checked state indicator
 * @property {boolean}  disabled  Indicator to if checkbox is disabled
 * @property {string}   label     Label of checkbox
 * @property {function} onChange  On change handler
 * @property {*}        value     Value that will be passed along when the checkbox is checked. Defaults to boolean
 */
CheckBox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func
};

CheckBox.defaultProps = {
	checked: false,
	disabled: false
};

export default CheckBox;