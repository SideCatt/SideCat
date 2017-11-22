/* global console */
/* eslint-disable no-console */

import BaseComponent from 'js/extensions/BaseComponent';
import React from 'react';
import Checkbox from 'js/components/sideModules/Checkbox';
import Slider from 'js/components/sideModules/Slider';

export default class Example extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = { sliderValue: 50 };
		this.bindMethods('setValueTest');
	}

	setValueTest() {
		this.setState({
			sliderValue: 100
		});
	}

	render() {
		const { sliderValue } = this.state;

		return (
			<div className='sidecat-container'>
				<button onClick={ this.setValueTest }> Test slider value passing </button>
				<Checkbox
					label='foo'
					onChange={ (e) => console.log(e) } />
				<Slider
					onDragChange={ () => {} }
					onDragEnd={ () => {} }
					max={ 100 }
					min={ 0 }/>
				<Slider
					value={ sliderValue }
					onDragChange={ () => {} }
					onDragEnd={ () => {} }
					max={ 100 }
					min={ 0 }/>
			</div>
		);
	}
}