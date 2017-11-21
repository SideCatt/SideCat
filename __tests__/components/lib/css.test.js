/* global test, expect */

import * as cssLibrary from 'js/lib/css';

test('sideCatClassnames should correctly render css classes', () => {
	const cssClasses = cssLibrary.sideCatClassnames('checkbox', {
		checked: true,
		disabled: false
	});

	expect(cssClasses).toEqual('sidecat-checkbox checked');
});

test('getWidthStyle should return an object with width pixel styling', () => {
	const inlineWidth = cssLibrary.getWidthStyle(25);

	expect(inlineWidth).toEqual({ width: '25px' });
});

test('generateTranslateXCSS should return 4 expected css transform attributes', () => {
	const translateCSS = cssLibrary.generateTranslateXCSS(25);
	const expectedString = 'translateX(25px)';
	const expectedCSS = {
		MozTransform: expectedString,
		msTransform: expectedString,
		transform: expectedString,
		WebkitTransform: expectedString
	};

	expect(translateCSS).toEqual(expectedCSS);
});

test('generateSliderInline should return slider inline CSS properties', () => {
	const cssClasses = cssLibrary.generateSliderInline(15);
	const expectedClasses = {
		knobPosition: cssLibrary.generateTranslateXCSS(15),
		trackCoverWidth: cssLibrary.getWidthStyle(15)
	};

	expect(cssClasses).toEqual(expectedClasses);
});