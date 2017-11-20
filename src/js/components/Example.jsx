import BaseComponent from 'js/extensions/BaseComponent';
import React from 'react';
import Checkbox from 'js/components/sideModules/Checkbox';

export default class Example extends BaseComponent {
	render() {
		return (
			<div className='sidecat-container'>
				carne a suh dude

				<Checkbox label='foo' onChange={ (e) => console.log(e) } />
			</div>
		);
	}
}