import React from 'react';
import BaseComponent from 'js/extensions/BaseComponent';
import PropTypes from 'prop-types';
import { sideCatClassnames } from 'js/lib/css';
import { findActiveChildren } from 'js/lib/react';

class Categories extends BaseComponent {
	constructor(props) {
		super(props);
		const { active, categories } = this.props;
		const activatedCategories = findActiveChildren(categories, active);

		this.state = {
			categories: activatedCategories
		};
	}

	componentWillReceiveProps(nextProps) {
		const { active } = this.props;
		const { active: nextActive, categories } = nextProps;

		if (active !== nextActive) {
			this.setState({
				categories: findActiveChildren(categories, active)
			});
		}
	}

	handleClick(value, event) {
		const { onChange } = this.props;

		if (onChange) {
			onChange(value, event);
		}
	}

	renderCategory(category) {
		const {
			children,
			label,
			value
		} = category;
		const categoryClass = sideCatClassnames('category', {
			active: category.active
		});

		return (
			<div
				className={ categoryClass }
				key={ category.value }
				onClick={ this.bindParams(this.handleClick, value) }>
				{ label }
				{
					children && children.map((cat) => this.renderCategory(cat))
				}
			</div>
		);
	}

	render() {
		const self = this;
		const { categories } = this.state;

		return (
			<div className='sidecat-categories'>
				{
					categories.map(function (cat) {
						return self.renderCategory(cat);
					})
				}
			</div>
		);
	}
}

/**
 * propTypes definition
 * @property {*}              active     Active category should match format of value
 * @property {array.<Object>} categories Array of objects containing a value and a label at minimum to render
 */
Categories.propTypes = {
	active: PropTypes.any,
	categories: PropTypes.arrayOf(PropTypes.object)
};

Categories.defaultProps = {
	active: null,
	categories: []
};

export default Categories;