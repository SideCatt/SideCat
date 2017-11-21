/* global document */

import React from 'react';
import BaseComponent from 'js/extensions/BaseComponent';
import { getRelativeCursorPosition } from 'js/lib/dom';
import {
	boundsCheckValue,
	getIntervalValue
} from 'js/lib/math';
import { INPUT } from 'js/constants/INPUT';
import PropTypes from 'prop-types';
import { sideCatClassnames, generateSliderInline } from 'js/lib/css';
import { SLIDER } from 'js/constants/SLIDER';

class Slider extends BaseComponent {
	constructor(props) {
		super(props);

		const state = {
			drag: false,
			value: 0
		};

		this.eventsAdded = false;
		this.bindMethods('handleDragChange', 'handleDragStart', 'handleDragEnd');
		this.state = state;
	}

	componentDidMount() {
		this.registerEventListeners();
	}

	componentDidUpdate() {
		this.registerEventListeners();
	}

	// Check incoming props for changes to calculate pixel values and store them in state
	componentWillReceiveProps(nextProps) {
		if (nextProps.value && nextProps.value !== this.state.value) {
			const { interval } = this.props;

			this.setState({
				value: getIntervalValue(nextProps.value, interval)
			});
		}
	}

	/**
	 * Get the value from the position the cursor is pointing at
	 * @param {object} event Synthetic Event object
	 */
	getSliderCursorValue(event) {
		const { slider } = this.refs;

		return getRelativeCursorPosition(event, slider).x;
	}

	/**
	 * Handle all incoming change events
	 * @param {string|number} value     Value relating to the change event
	 * @param {string}        eventType Event type
	 */
	handleChangeEvent(value, eventType) {
		const {
			disabled,
			interval,
			max,
			min,
			onDragEnd,
			onInputChange
		} = this.props;
		const numValue = Number(value);
		const changedValue = eventType === SLIDER.INPUT_CHANGE
			? boundsCheckValue(numValue, min, max)
			: getIntervalValue(numValue, interval);

		if (disabled) {
			return;
		}

		switch (eventType) {
			case SLIDER.DRAG_END:
			case SLIDER.INPUT_END:
				if (onDragEnd) {
					onDragEnd(numValue);
				}

				break;
			case SLIDER.INPUT_CHANGE:
				this.setDragValues(changedValue, eventType);
				const changeHandler = onInputChange || onDragEnd;

				if (changeHandler) {
					changeHandler(numValue);
				}

				break;
			default:
				this.setDragValues(changedValue, eventType);

				break;
		}
	}

	/**
	 * Handles input field changes to the slider
	 * @param {object} event Synthetic Event object
	 */
	handleDragChange(event) {
		const { drag } = this.state;

		if (drag) {
			const nextValue = this.getSliderCursorValue(event);

			this.handleChangeEvent(nextValue, SLIDER.DRAG_CHANGE);
		}
	}

	/**
	 * Handle slider drag start event
	 * @param {object} event Synthetic Event object
	 */
	handleDragStart(event) {
		const { drag } = this.state;
		const nextValue = this.getSliderCursorValue(event);

		if (!drag) {
			this.setState({ drag: true });
			this.handleChangeEvent(nextValue, SLIDER.DRAG_START);
		}
	}

	/**
	 * Handle slider drag end event
	 */
	handleDragEnd() {
		const { value, drag } = this.state;

		if (drag) {
			this.setState({ drag: false });
			this.handleChangeEvent(value, SLIDER.DRAG_END);
		}
	}

	/**
	 * Handle onchange event of the input
	 * @param {string} eventType Defined event type for the slider
	 * @param {object} event     Synthetic Event Object
	 */
	handleInputEvent(eventType, event) {
		const { keyCode, which, target } = event;
		const keycode = keyCode || which;
		const { value } = target;

		if (keycode === INPUT.ENTER && eventType === SLIDER.INPUT_KEYPRESS) {
			target.blur();
		}
		else if (eventType === SLIDER.INPUT_CHANGE) {
			this.handleChangeEvent(value, eventType);
		}
	}

	/**
	 * Make sure to switch on and off event listeners based on disabled state of the property
	 */
	registerEventListeners() {
		const { disabled } = this.props;

		if (!disabled && !this.eventsAdded) {
			this.eventsAdded = true;

			document.addEventListener('mouseup', this.handleDragEnd);
			document.addEventListener('mousemove', this.handleDragChange);
		}
		else if (disabled && this.eventsAdded) {
			this.eventsAdded = false;

			document.removeEventListener('mouseup', this.handleDragEnd);
			document.removeEventListener('mousemove', this.handleDragChange);
		}
	}

	/**
	 * Set in-component drag values
	 * @param {number} value     Drag Value
	 */
	setDragValues(value, eventType) {
		const { onDragChange, onDragEnd } = this.props;
		const isDragChange = eventType === SLIDER.DRAG_CHANGE || eventType === SLIDER.INPUT_CHANGE;
		const isDragEnd = eventType === SLIDER.DRAG_END || eventType === SLIDER.INPUT_END;

		this.setState({ value });

		if (isDragChange) {
			onDragChange(value);
		}

		if (isDragEnd) {
			onDragEnd(value);
		}

	}

	renderLabel() {
		const { label, value } = this.props;

		return (
			<div className='slider-data'>
				<label>
					{ label }
				</label>
				<div className='value'>
					{ value }
				</div>
			</div>
		);
	}

	render() {
		const {
			disabled,
			onInputChange
		} = this.props;
		const { value } = this.state;
		const {
			knobPosition,
			trackCoverWidth
		} = generateSliderInline(value);
		const sliderClassnames = sideCatClassnames('slider', {
			disabled
		});

		return (
			<div className={ sliderClassnames }>
				<div className='slider' ref='slider' onMouseDown={ !disabled && this.handleDragStart }>
					<div className='track'>
						<div className='cover' style={ trackCoverWidth } />
					</div>

					<div className='knob' style={ knobPosition } />
				</div>
				{
					onInputChange && (
						<input onChange={ this.handleInputEvent.bind(this, SLIDER.INPUT_CHANGE) }/>
					)
				}
			</div>
		);
	}
}

/**
 *  * @type {number}        defaultValue  Default starting value for a slider
 *  * @type {boolean}       disabled      Indication of disabled state and styles
 *  * @type {number}        interval      Step size between acceptable values
 *  * @type {number}        max           Max value for slider
 *  * @type {number}        min           Minimum value for slider
 *  * @type {function}      onDragChange  Event handler for drag change
 *  * @type {function}      onDragEnd     Event handler for drag end
 *  * @type {function}      onInputChange Event handler for input value change
 *  * @type {number|string} value         Value being modified by slider
 */
Slider.propTypes = {
	defaultValue: PropTypes.number,
	disabled: PropTypes.bool,
	interval: PropTypes.number,
	max: PropTypes.number,
	min: PropTypes.number,
	onDragChange: PropTypes.func,
	onDragEnd: PropTypes.func,
	onInputChange: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};

Slider.defaultProps = {
	defaultValue: 0,
	interval: 1
};

export default Slider;