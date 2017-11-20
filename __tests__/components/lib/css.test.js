/* global test, expect */

import * as cssLibrary from 'js/lib/css';

test('sideCatClassnames should correctly render css classes', () => {
	const cssClasses = cssLibrary.sideCatClassnames('checkbox', {
		checked: true,
		disabled: false
	});

	expect(cssClasses).toEqual('sidecat-checkbox checked');
});