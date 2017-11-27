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
 * @property {boolean}  checked   Overridable checked state indicator
 * @property {boolean}  disabled  Indicator to if checkbox is disabled
 * @property {string}   label     Label of checkbox
 * @property {function} onChange  On change handler
 */
CheckBox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func
};

CheckBox.defaultProps = {
	checked: false,
	disabled: false
};

export default CheckBox;