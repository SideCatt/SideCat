import React from 'react';

/**
 * Base component serves as an extension for react components to be able to
 * share default methods.
 */
class BaseComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	/**
	 * For binding methods to class instance
	 */
	bind(...methods) {
		methods.forEach((method) => {
			this[ method ] = this[ method ].bind(this);
		});
	}

	/**
	 * Binding nested params that are needed to pass back to the action/service
	 * @param   {function} method Function given from the prop
	 * @param   {...args}  params Arguments from direct child component
	 * @returns {function}        Function that handles all nested parameters
     */
	bindParams(method, ...params) {
		return (...args) => {
			if (method && method.constructor && method.apply) {
				method.apply(this, params.concat(args));
			}
		};
	}
}

export default BaseComponent;