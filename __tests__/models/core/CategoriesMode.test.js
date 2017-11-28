/* global test, expect */
import Models from 'js/models';

const testCategories = [
	new Models.CategoryModel({
		value: 'category1',
		label: 'Sam and Jon are the best',
		children: [
			new Models.CategoryModel({
				value: 'category1child1',
				label: 'Better than the rest',
				children: [
					new Models.CategoryModel({ value: 'category1child2sibling1', label: '100 100 100 100' }),
					new Models.CategoryModel({ value: 'category1child2sibling2', label: 'ez mode' })
				]
			})
		]
	}),
	new Models.CategoryModel({ value: 'category2', label: '#1 baby' })
];
const testCategoriesModel = new Models.CategoriesModel({
	name: 'cat1',
	categories: testCategories
});

test('Categories serialization should recursively return serialized children', () => {
	expect(testCategoriesModel.serialize()).toEqual({
		name: 'cat1',
		categories: [
			{
				value: 'category1',
				label: 'Sam and Jon are the best',
				children: [
					{
						value: 'category1child1',
						label: 'Better than the rest',
						children: [
							{
								value: 'category1child2sibling1',
								label: '100 100 100 100',
								children: null
							},
							{
								value: 'category1child2sibling2',
								label: 'ez mode',
								children: null
							}
						]
					}
				]
			},
			{ value: 'category2', label: '#1 baby', children: null }
		]
	});
});