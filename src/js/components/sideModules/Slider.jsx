import React from 'react';
import BaseComponent from 'js/extensions/BaseComponent';
import classnames from 'classnames';

class Slider extends BaseComponent {
	render() {
		const disabled = false;
		const sliderClassnames = classnames('sidecat-slider', {
			disabled
		});
		const trackCoverWidth = 0;
		const knobPosition = 0;

		return (
			<div className={ sliderClassnames }>
				<div className='slider' ref='slider' onMouseDown={ !disabled && this.handleDragStart }>
					<div className='track'>
						<div className='cover' style={ trackCoverWidth } />
					</div>

					<div className='knob' style={ knobPosition } />
				</div>
			</div>
		);
	}
}

export default Slider;