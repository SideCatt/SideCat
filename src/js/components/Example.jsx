/* global console */
/* eslint-disable no-console */

import BaseComponent from 'js/extensions/BaseComponent';
import React from 'react';
import Checkbox from 'js/components/sideModules/Checkbox';
import Slider from 'js/components/sideModules/Slider';

export default class Example extends BaseComponent {
	render() {
		return (
			<div className='sidecat-container'>
				<Checkbox
					label='foo'
					onChange={ (e) => console.log(e) } />
				<Slider
					onDragChange={ () => {} }
					onDragEnd={ () => {} }
					max={ 100 }
					min={ 0 }/>
				<Slider
					defaultValue={ 50 }
					onDragChange={ () => {} }
					onDragEnd={ () => {} }
					max={ 100 }
					min={ 0 }/>
			</div>
		);
	}
}