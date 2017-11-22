/* global test, expect */
import SideCatProps from 'js/models/core/SideCatProps';

test('SideCatProps should be able to validate primitive type plus object and array', () => {
	expect(SideCatProps.array.validate([])).toBe(true);
	expect(SideCatProps.bool.validate(true)).toBe(true);
	expect(SideCatProps.func.validate(() => {})).toBe(true);
	expect(SideCatProps.number.validate(10)).toBe(true);
	expect(SideCatProps.object.validate({})).toBe(true);
	expect(SideCatProps.string.validate('')).toBe(true);
});

test('SideCatProps should be able to include Optional types', () => {
	expect(SideCatProps.array.isOptional.validate(null)).toBe(true);
	expect(SideCatProps.number.isOptional.validate(50)).toBe(true);
});

test('SideCatProps.defineStructure should be able to define a read-only "Structure" to the model passed in', () => {
	class MockModel {}

	SideCatProps.defineStructure(MockModel, {
		baz: 2,
		foo: 'bar'
	});

	expect(MockModel.Structure).toEqual({
		baz: 2,
		foo: 'bar'
	});

	expect(() => {
		MockModel.Structure.foobar = 3;
	}).toThrow();

	expect(() => {
		MockModel.Structure = { something: 'else' };
	}).toThrow();
});

test('SideCatProps.checkPropTypes should be able to validate the structure given', () => {
	const data = {
		foo: '1',
		bar: 2,
		baz: false
	};
	const structure = {
		foo: SideCatProps.string,
		bar: SideCatProps.number,
		baz: SideCatProps.bool
	};
	const valid = SideCatProps.checkPropTypes(structure, data, 'data', 'JestTest');

	expect(valid).toBe(true);
});

test('SideCatProps.checkPropTypes should property throw error properly', () => {
	const data = { foo: 'bar' };
	const structure = { foo: SideCatProps.number };

	expect(() => {
		SideCatProps.checkPropTypes(structure, data, 'JestTest');
	}).toThrowErrorMatchingSnapshot();
});