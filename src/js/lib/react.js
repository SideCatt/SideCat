
/**
 * Class handles boilerplate javascript to attribute active state to a data array.
 * This does not handle array of active values. Recursively searches children.
 * @param   {array}  values Array of data for iteratively rendered child components
 * @param   {string} active Active element of child components
 * @returns {object}        Returns hasActiveChild and children properties
 */
function parseActiveChildren(values, active) {
	let activeChild = false;

	const activeValues = values.map(function (val) {
		const childrenTraversed = (val.children && parseActiveChildren(val.children, active));
		const isActive = val.value === active || Boolean(childrenTraversed && childrenTraversed.hasActiveChild);

		if (isActive) {
			activeChild = true;
		}

		const activatedChild = Object.assign({}, val, {
			active: isActive
		});

		if (val.children) {
			activatedChild.children = childrenTraversed.children;
		}

		return activatedChild;
	});

	return {
		children: activeValues,
		hasActiveChild: activeChild
	};
}

/**
 * Returns the children from recursive parseActiveChildren function.
 * Removes vestigial hasActiveChild property for component layer.
 * @param   {array}  values Array of children components with values to be matched recursively for active state
 * @param   {string} active Active value
 * @returns {array}         Returns activated data array.
 */
export function findActiveChildren(values, active) {
	return parseActiveChildren(values, active).children;
}