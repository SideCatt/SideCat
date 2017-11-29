import isNil from 'ramda/src/isNil';
import ramdaGetType from 'ramda/src/type';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var TYPES = {
	ARRAY: 'Array',
	BOOL: 'Boolean',
	FUNC: 'Function',
	NUMBER: 'Number',
	OBJECT: 'Object',
	STRING: 'String'
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* eslint-disable no-use-before-define */

/**
 * Creates a new Type class with the ability to validate value of its type
 * @class
 * @property {string} type Name of type
 */

var Type = function () {
	function Type(type) {
		classCallCheck(this, Type);

		this.type = type;
	}

	/**
  * Get type name
  * @returns {string} Name of type
  */


	createClass(Type, [{
		key: 'getType',
		value: function getType() {
			return this.type;
		}

		/**
   * Validate the value against its type. Returns true if matched
   * @param   {any}     value Value to be compared
   * @returns {boolean}       Indicator if the types match
   */

	}, {
		key: 'validate',
		value: function validate(value) {
			return ramdaGetType(value) === this.type;
		}

		/**
   * Returns decorated OptionalType object to check for nil values
   * @returns {OptionalType} OptionalType object
   */

	}, {
		key: 'isOptional',
		get: function get$$1() {
			return new OptionalType(this);
		}
	}]);
	return Type;
}();

/**
 * Decorated OptionalType class to return true for nil values
 * @class
 * @property {string} type Name of type
 */


var OptionalType = function (_Type) {
	inherits(OptionalType, _Type);

	function OptionalType(type) {
		classCallCheck(this, OptionalType);
		return possibleConstructorReturn(this, (OptionalType.__proto__ || Object.getPrototypeOf(OptionalType)).call(this, type));
	}

	createClass(OptionalType, [{
		key: 'validate',
		value: function validate(value) {
			return isNil(value) ? true : this.type.validate(value);
		}
	}]);
	return OptionalType;
}(Type);

/**
 * InstanceOf class, child to Type, to provide support for the existence of an object that matches the structure of a provided class.
 * @class
 * @property {object} type Object class to match structure against.
 */

var InstanceOf = function (_Type) {
	inherits(InstanceOf, _Type);

	function InstanceOf(type) {
		classCallCheck(this, InstanceOf);
		return possibleConstructorReturn(this, (InstanceOf.__proto__ || Object.getPrototypeOf(InstanceOf)).call(this, type));
	}

	createClass(InstanceOf, [{
		key: 'getType',
		value: function getType() {
			return this.type.name;
		}
	}, {
		key: 'validate',
		value: function validate(value) {
			var typeKeys = this.type.prototype ? Object.getOwnPropertyNames(this.type.prototype) : Object.keys(this.type);

			if (!value || !value.constructor || this.getType() !== value.constructor.name) {
				return false;
			}

			for (var i = 0; i < typeKeys.length; i++) {
				var prop = typeKeys[i];

				if (!value[prop]) {
					return false;
				}
			}

			return true;
		}
	}]);
	return InstanceOf;
}(Type);

/**
 * InstanceOf class, child to Type, to provide support for the existence of an object that matches the structure of a provided class.
 * @class
 * @property {object} type Object class to match structure against.
 */

var ArrayOf = function (_Type) {
	inherits(ArrayOf, _Type);

	function ArrayOf(type) {
		classCallCheck(this, ArrayOf);

		var validatedtype = type.validate ? type : new InstanceOf(type);

		return possibleConstructorReturn(this, (ArrayOf.__proto__ || Object.getPrototypeOf(ArrayOf)).call(this, validatedtype));
	}

	createClass(ArrayOf, [{
		key: 'getType',
		value: function getType() {
			return this.type.constructor.name;
		}
	}, {
		key: 'validate',
		value: function validate(values) {
			var _this2 = this;

			return values.every(function (value) {
				return _this2.type.validate(value);
			});
		}
	}]);
	return ArrayOf;
}(Type);

/**
 * OneOfType class, child to Type, to provide support for the existence of a matching type array.
 * @class
 * @property {array} types Array of Type classes
 */

var OneOfType = function (_Type) {
	inherits(OneOfType, _Type);

	function OneOfType(types) {
		classCallCheck(this, OneOfType);
		return possibleConstructorReturn(this, (OneOfType.__proto__ || Object.getPrototypeOf(OneOfType)).call(this, types));
	}

	createClass(OneOfType, [{
		key: 'getType',
		value: function getType() {
			return this.types.reduce(function (prev, next) {
				return prev.getType() + ' ' + next.getType();
			}, '');
		}
	}, {
		key: 'validate',
		value: function validate(value) {
			return this.type.some(function (type) {
				return type.validate(value);
			});
		}
	}]);
	return OneOfType;
}(Type);

/* eslint-disable no-use-before-define */

/**
 * Return a frozen Type object
 * @param   {string} type Name of type
 * @returns {Type}        Frozen Type object from the given param
 */
function getArrayValidator(types) {
	var validators = new ArrayOf(types);

	return Object.freeze(validators);
}

function getTypeValidator(type) {
	var typeValidator = new Type(type);

	return Object.freeze(typeValidator);
}

function getInstanceValidator(instance) {
	var typeValidator = new InstanceOf(instance);

	return Object.freeze(typeValidator);
}

function getMultipleValidators() {
	for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
		types[_key] = arguments[_key];
	}

	var validators = new OneOfType(types);

	return Object.freeze(validators);
}

var SideCatProps = {};

/**
 * Validate all the props and its value type
 * @param {Object}   structure     Pre-defined structure configuration
 * @param {Model}    dataStructure Instantiated model object
 * @param {string}   modelName     Name of model
 * @returns {boolean}
 */
SideCatProps.checkPropTypes = function (structure, dataStructure, modelName) {
	return Object.keys(structure).every(function (propKey) {
		var validator = structure[propKey];
		var value = dataStructure[propKey];

		if (validator.validate(value)) {
			return true;
		}

		var actualType = ramdaGetType(value);
		var expectedType = validator.getType();

		throw new Error('Invalid `' + modelName + '` structure: type ' + actualType + ' supplied to `' + propKey + '`, expected ' + expectedType + '.');
	});
};

/**
 * Assign "Structure" property to the modelClass, defined by given structure
 * @param {Model}  modelClass Model Class
 * @param {Object} structure  Structure configuration
 */
SideCatProps.defineStructure = function (modelClass, structure) {
	Object.defineProperty(modelClass, 'Structure', {
		value: Object.freeze(structure)
	});
};

// Define types
SideCatProps.any = { validate: function validate() {
		return true;
	} };
SideCatProps.array = getTypeValidator(TYPES.ARRAY);
SideCatProps.bool = getTypeValidator(TYPES.BOOL);
SideCatProps.func = getTypeValidator(TYPES.FUNC);
SideCatProps.number = getTypeValidator(TYPES.NUMBER);
SideCatProps.object = getTypeValidator(TYPES.OBJECT);
SideCatProps.string = getTypeValidator(TYPES.STRING);
SideCatProps.instanceOf = getInstanceValidator;
SideCatProps.oneOf = getMultipleValidators;
SideCatProps.arrayOf = getArrayValidator;

var SideCatProps$1 = Object.freeze(SideCatProps);

/**
 * Creates a new Model
 * @class
 * @property {Object} dataStructure Structure defined for the Model
 */

var Model = function () {
	/**
  * Model will validate the structure upon instantiation
  * @param {object} dataStructure
  */
	function Model(dataStructure) {
		classCallCheck(this, Model);

		try {
			this.validate(dataStructure);

			this.dataStructure = dataStructure;
		} catch (error) {
			this.handleValidateError(error);
		}
	}

	/**
  * Properly throw data structure error due to invalidation
  * @param {Error} error Error object thrown by validator
  */


	createClass(Model, [{
		key: 'handleValidateError',
		value: function handleValidateError(error) {
			throw error;
		}

		/**
   * Validata data structure
   * @param   {object}  dataStructure Data structure
   * @returns {boolean}               Returns true if the data structure is valid
   * @throws  {Error}                 Throws an error with proper messaging if any props don't match
   */

	}, {
		key: 'validate',
		value: function validate(dataStructure) {
			return SideCatProps$1.checkPropTypes(Model.Structure, dataStructure, this.constructor.name);
		}
	}, {
		key: 'serialize',
		value: function serialize() {
			return this.dataStructure;
		}
	}]);
	return Model;
}();

SideCatProps$1.defineStructure(Model, {});

/**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */

var CategoryModel = function (_Model) {
	inherits(CategoryModel, _Model);

	function CategoryModel(dataStructure) {
		classCallCheck(this, CategoryModel);
		return possibleConstructorReturn(this, (CategoryModel.__proto__ || Object.getPrototypeOf(CategoryModel)).call(this, dataStructure));
	}

	createClass(CategoryModel, [{
		key: 'validate',
		value: function validate(dataStructure) {
			return SideCatProps$1.checkPropTypes(CategoryModel.Structure, dataStructure, this.constructor.name);
		}
	}, {
		key: 'serialize',
		value: function serialize() {
			return Object.assign({}, Model.prototype.serialize.call(this), {
				children: this.serializeChildren(this.dataStructure.children)
			});
		}
	}, {
		key: 'serializeChildren',
		value: function serializeChildren(children) {
			var _this2 = this;

			if (!children) {
				return null;
			}

			return children.map(function (child) {
				return Object.assign({}, Model.prototype.serialize.call(child), {
					children: _this2.serializeChildren(child.dataStructure.children)
				});
			});
		}
	}]);
	return CategoryModel;
}(Model);

/**
 * propTypes Definition
 * @type {string} label Label of Slider
 * @type {string} name  Name of Slider
 * @type {number} max   Maximum value of slider
 * @type {number} min   Minimum value of slider
 * @type {number} value Optional overridable value
 */


SideCatProps$1.defineStructure(CategoryModel, {
	label: SideCatProps$1.string,
	value: SideCatProps$1.any,
	children: SideCatProps$1.arrayOf(CategoryModel).isOptional
});

/**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */

var CategoriesModel = function (_Model) {
	inherits(CategoriesModel, _Model);

	function CategoriesModel(dataStructure) {
		classCallCheck(this, CategoriesModel);
		return possibleConstructorReturn(this, (CategoriesModel.__proto__ || Object.getPrototypeOf(CategoriesModel)).call(this, dataStructure));
	}

	createClass(CategoriesModel, [{
		key: 'validate',
		value: function validate(dataStructure) {
			return SideCatProps$1.checkPropTypes(CategoriesModel.Structure, dataStructure, this.constructor.name);
		}
	}, {
		key: 'serialize',
		value: function serialize() {
			return Object.assign({}, Model.prototype.serialize.call(this), {
				categories: this.dataStructure.categories.map(function (cat) {
					return cat.serialize();
				})
			});
		}
	}]);
	return CategoriesModel;
}(Model);

/**
 * propTypes Definition
 * @type {string} label Label of Slider
 * @type {string} name  Name of Slider
 * @type {number} max   Maximum value of slider
 * @type {number} min   Minimum value of slider
 * @type {number} value Optional overridable value
 */


SideCatProps$1.defineStructure(CategoriesModel, {
	categories: SideCatProps$1.arrayOf(CategoryModel),
	name: SideCatProps$1.string
});

/**
 /**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */

var CheckBoxModel = function (_Model) {
	inherits(CheckBoxModel, _Model);

	function CheckBoxModel(dataStructure) {
		classCallCheck(this, CheckBoxModel);
		return possibleConstructorReturn(this, (CheckBoxModel.__proto__ || Object.getPrototypeOf(CheckBoxModel)).call(this, dataStructure));
	}

	createClass(CheckBoxModel, [{
		key: 'validate',
		value: function validate(dataStructure) {
			return SideCatProps$1.checkPropTypes(CheckBoxModel.Structure, dataStructure, this.constructor.name);
		}
	}]);
	return CheckBoxModel;
}(Model);

/**
 * propTypes Definition
 * @type {string} label Label of checkbox
 * @type {string} name  Name of checkbox
 */


SideCatProps$1.defineStructure(CheckBoxModel, {
	label: SideCatProps$1.string,
	name: SideCatProps$1.string
});

/**
 * Creates a new CheckBoxModel
 * @class
 * @param {Object} dataStructure Structure defined for the Model
 */

var SliderModel = function (_Model) {
	inherits(SliderModel, _Model);

	function SliderModel(dataStructure) {
		classCallCheck(this, SliderModel);
		return possibleConstructorReturn(this, (SliderModel.__proto__ || Object.getPrototypeOf(SliderModel)).call(this, dataStructure));
	}

	createClass(SliderModel, [{
		key: 'validate',
		value: function validate(dataStructure) {
			return SideCatProps$1.checkPropTypes(SliderModel.Structure, dataStructure, this.constructor.name);
		}
	}]);
	return SliderModel;
}(Model);

/**
 * propTypes Definition
 * @type {string} label Label of Slider
 * @type {string} name  Name of Slider
 * @type {number} max   Maximum value of slider
 * @type {number} min   Minimum value of slider
 * @type {number} value Optional overridable value
 */


SideCatProps$1.defineStructure(SliderModel, {
	label: SideCatProps$1.string,
	name: SideCatProps$1.string,
	max: SideCatProps$1.number,
	min: SideCatProps$1.number
});

var Models = {
	CategoriesModel: CategoriesModel,
	CategoryModel: CategoryModel,
	CheckBoxModel: CheckBoxModel,
	SliderModel: SliderModel
};

/**
 * Base component serves as an extension for react components to be able to
 * share default methods.
 */

var BaseComponent = function (_React$Component) {
	inherits(BaseComponent, _React$Component);

	function BaseComponent(props) {
		classCallCheck(this, BaseComponent);
		return possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));
	}

	/**
  * For binding methods to class instance
  */


	createClass(BaseComponent, [{
		key: 'bindMethods',
		value: function bindMethods() {
			var _this2 = this;

			for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
				methods[_key] = arguments[_key];
			}

			methods.forEach(function (method) {
				_this2[method] = _this2[method].bind(_this2);
			});
		}

		/**
   * Binding nested params that are needed to pass back to the action/service
   * @param   {function} method Function given from the prop
   * @param   {...args}  params Arguments from direct child component
   * @returns {function}        Function that handles all nested parameters
      */

	}, {
		key: 'bindParams',
		value: function bindParams(method) {
			var _this3 = this;

			for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				params[_key2 - 1] = arguments[_key2];
			}

			return function () {
				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				if (method && method.constructor && method.apply) {
					method.apply(_this3, params.concat(args));
				}
			};
		}
	}]);
	return BaseComponent;
}(React.Component);

var SIDE_CAT_CSS = 'sidecat';

/**
 * Prepend 'sidecat' to designated name
 * and apply additional arguments to classname function
 * @param   {string} name Name of main class
 * @param   {any}    args Arguments following classnames params structure
 * @returns {string}      CSS classname
 */
function sideCatClassnames(name) {
  var sideCatClassName = SIDE_CAT_CSS + '-' + name;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return classnames.apply(undefined, [sideCatClassName].concat(args));
}

/**
 * Returns object containing a width property and a px sizing as specified by value
 * @param  {number|string} value Size of inline CSS width
 * @return {object}              Object containing modified width value in pixels
 */
function getWidthStyle(value) {
  return { width: value + 'px' };
}

/**
 * Transforms a string value into an object containing transform CSS
 * @param  {number|string} value Translation distance value
 * @return {object}              Object containing Moz, ms, webkit, and standard transform values
 */
function generateTranslateXCSS(value) {
  var translateValue = 'translateX(' + value + 'px)';

  return {
    MozTransform: translateValue,
    msTransform: translateValue,
    transform: translateValue,
    WebkitTransform: translateValue
  };
}

/**
 * returns slider inline CSS properties for sidecat slider components
 * @param  {number|string} value Value that needs to be converted to inline css strings
 * @return {object}              Object containing knobPostion (transform properties) and trackCoverWidth (width property)
 */
function generateSliderInline(value) {
  return {
    knobPosition: generateTranslateXCSS(value),
    trackCoverWidth: getWidthStyle(value)
  };
}

/**
 * Class handles boilerplate javascript to attribute active state to a data array.
 * This does not handle array of active values. Recursively searches children.
 * @param   {array}  values Array of data for iteratively rendered child components
 * @param   {string} active Active element of child components
 * @returns {object}        Returns hasActiveChild and children properties
 */
function parseActiveChildren(values, active) {
	var activeChild = false;

	var activeValues = values.map(function (val) {
		var childrenTraversed = val.children && parseActiveChildren(val.children, active);
		var isActive = val.value === active || Boolean(childrenTraversed && childrenTraversed.hasActiveChild);

		if (isActive) {
			activeChild = true;
		}

		var activatedChild = Object.assign({}, val, {
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
function findActiveChildren(values, active) {
	return parseActiveChildren(values, active).children;
}

var Categories = function (_BaseComponent) {
	inherits(Categories, _BaseComponent);

	function Categories(props) {
		classCallCheck(this, Categories);

		var _this = possibleConstructorReturn(this, (Categories.__proto__ || Object.getPrototypeOf(Categories)).call(this, props));

		var _this$props = _this.props,
		    active = _this$props.active,
		    categories = _this$props.categories;

		var activatedCategories = findActiveChildren(categories, active);

		_this.state = {
			categories: activatedCategories
		};
		return _this;
	}

	createClass(Categories, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var active = this.props.active;
			var nextActive = nextProps.active,
			    categories = nextProps.categories;


			if (active !== nextActive) {
				this.setState({
					categories: findActiveChildren(categories, active)
				});
			}
		}
	}, {
		key: 'handleClick',
		value: function handleClick(value, event) {
			var onChange = this.props.onChange;


			if (onChange) {
				onChange(value, event);
			}
		}
	}, {
		key: 'renderCategory',
		value: function renderCategory(category) {
			var _this2 = this;

			var children = category.children,
			    label = category.label,
			    value = category.value;

			var categoryClass = sideCatClassnames('category', {
				active: category.active
			});

			return React.createElement(
				'div',
				{
					className: categoryClass,
					key: category.value,
					onClick: this.bindParams(this.handleClick, value) },
				label,
				children && children.map(function (cat) {
					return _this2.renderCategory(cat);
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this;
			var categories = this.state.categories;


			return React.createElement(
				'div',
				{ className: 'sidecat-categories' },
				categories.map(function (cat) {
					return self.renderCategory(cat);
				})
			);
		}
	}]);
	return Categories;
}(BaseComponent);

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

/**
 * @typedef {React.Component} CheckBox
 */

var CheckBox = function (_BaseComponent) {
	inherits(CheckBox, _BaseComponent);

	function CheckBox(props) {
		classCallCheck(this, CheckBox);

		var _this = possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, props));

		var checked = _this.props.checked;


		_this.state = { checked: checked };
		_this.bindMethods('handleChange');
		return _this;
	}

	createClass(CheckBox, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var prevChecked = this.props.checked;
			var nextChecked = nextProps.checked;


			if (prevChecked !== nextChecked) {
				this.setState({
					checked: nextChecked
				});
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(event) {
			var onChange = this.props.onChange;
			var checked = this.state.checked;

			var nextChecked = !checked;

			this.setState({ checked: nextChecked });

			if (onChange) {
				onChange(nextChecked, event);
			}
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var label = this.props.label;


			if (label) {
				return React.createElement(
					'label',
					null,
					label
				);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var disabled = this.props.disabled;
			var checked = this.state.checked;

			var checkboxClassnames = sideCatClassnames('checkbox', {
				checked: checked,
				disabled: disabled
			});

			return React.createElement(
				'div',
				{ className: checkboxClassnames },
				React.createElement('input', {
					checked: checked,
					disabled: disabled,
					onChange: this.handleChange,
					type: 'checkbox' }),
				this.renderLabel()
			);
		}
	}]);
	return CheckBox;
}(BaseComponent);

/**
 * propTypes definition
 * @property {boolean}  checked   Overridable checked state indicator
 * @property {boolean}  disabled  Indicator to if checkbox is disabled
 * @property {string}   label     Label of checkbox
 * @property {function} onChange  On change handler
 */


CheckBox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func
};

CheckBox.defaultProps = {
	checked: false,
	disabled: false
};

/**
 * Get current cursor position relative to the element
 * @param  {object} event   Synthetic Event object
 * @param  {object} element DOM Element
 * @return {object}         X & Y Coordinate relative to the top left corner of the element
 */
function getRelativeCursorPosition(event, element) {
	var elementCoordinates = element.getBoundingClientRect();
	var left = elementCoordinates.left,
	    top = elementCoordinates.top;

	var mouseX = event.clientX - left;
	var mouseY = event.clientY - top;
	var clientWidth = element.clientWidth,
	    clientHeight = element.clientHeight;

	var coordinate = {
		x: mouseX,
		y: mouseY
	};

	if (mouseX > clientWidth) {
		coordinate.x = clientWidth;
	} else if (mouseX < 0) {
		coordinate.x = 0;
	}

	if (mouseY > clientHeight) {
		coordinate.y = clientHeight;
	} else if (mouseY < 0) {
		coordinate.y = 0;
	}

	return coordinate;
}

/**
 * Bounds check a value
 * @param  {number} value    Current value
 * @param  {number} minValue Minimum possible value
 * @param  {number} maxValue Maximum possible value
 * @return {number}          Bounds checked value
 */
function boundsCheckValue() {
	var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var minValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var maxValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	if (!value || !maxValue) {
		return 0;
	}

	if (value < minValue) {
		return minValue;
	}

	if (value > maxValue) {
		return maxValue;
	}

	return value;
}

/**
 * Get the next value based on the value given and the interval the value should go by
 * @param  {number} value    Value to determine the next interval value
 * @param  {number} interval Incrementing step size
 * @return {number}          Next vlue reflecting on the interval given
 */
function getIntervalValue(value, interval) {
	if (interval === 1) {
		return value;
	}

	var remainder = value % interval;

	return remainder === 0 ? value : value - remainder + interval * Math.round(remainder / interval);
}

/**
 * Translates a value on a scale to a relative pixel value on a scale
 * @param {number} value               Numeric value to be normalized from 0-1.
 * @param {number} scale               Scaling factor to apply to the normalized value
 * @param {number} properties.min      (Optional) Minimum value for the value on a  0
 * @param {number} properties.max      (Optional) Interval step on the scale defaults to 1
 * @param {number} properties.interval (Optional) Interval step on the scale defaults to 1
 */
function translateValueToPosition(value, scale) {
	var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var _properties$interval = properties.interval,
	    interval = _properties$interval === undefined ? 1 : _properties$interval,
	    _properties$max = properties.max,
	    max = _properties$max === undefined ? 1 : _properties$max,
	    _properties$min = properties.min,
	    min = _properties$min === undefined ? 0 : _properties$min;

	var relativeValue = boundsCheckValue(value, min, max);

	if (value > 1 && max > 1) {
		var normalizedValue = getIntervalValue(value, interval);

		relativeValue = (normalizedValue - min) / (max - min);
	}

	if (relativeValue > 1) {
		return scale;
	} else if (relativeValue < 0) {
		return 0;
	}

	return relativeValue * scale;
}

var INPUT = {
	ENTER: 13
};

var SLIDER = {
	DEFAULT_WIDTH: 150,
	DRAG_CHANGE: 'drag_change',
	DRAG_END: 'drag_end',
	DRAG_START: 'drag_start',
	INPUT_CHANGE: 'input_change'
};

/* global document */

var Slider = function (_BaseComponent) {
	inherits(Slider, _BaseComponent);

	function Slider(props) {
		classCallCheck(this, Slider);

		var _this = possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

		var state = {
			value: null,
			drag: false
		};

		_this.eventsAdded = false;
		_this.bindMethods('handleDragChange', 'handleDragStart', 'handleDragEnd');
		_this.state = state;
		return _this;
	}

	createClass(Slider, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var slider = this.refs.slider;
			var _props = this.props,
			    interval = _props.interval,
			    max = _props.max,
			    min = _props.min,
			    _props$value = _props.value,
			    value = _props$value === undefined ? 0 : _props$value;

			var sliderValue = slider ? translateValueToPosition(value, slider.clientWidth, { max: max, min: min, interval: interval }) : 0;

			this.registerEventListeners();
			this.setState({
				value: sliderValue
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.registerEventListeners();
		}

		// Check incoming props for changes to calculate pixel values and store them in state

	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var slider = this.refs.slider;


			if (nextProps.value && nextProps.value !== this.props.value && slider) {
				var _props2 = this.props,
				    interval = _props2.interval,
				    max = _props2.max,
				    min = _props2.min;


				this.setState({
					value: translateValueToPosition(nextProps.value, slider.clientWidth, { max: max, min: min, interval: interval })
				});
			}
		}

		/**
   * Get the value from the position the cursor is pointing at
   * @param {object} event Synthetic Event object
   */

	}, {
		key: 'getSliderCursorValue',
		value: function getSliderCursorValue(event) {
			var slider = this.refs.slider;


			return getRelativeCursorPosition(event, slider).x;
		}

		/**
   * Handle all incoming change events
   * @param {string|number} value     Value relating to the change event
   * @param {string}        eventType Event type
   */

	}, {
		key: 'handleChangeEvent',
		value: function handleChangeEvent(value, eventType) {
			var _props3 = this.props,
			    disabled = _props3.disabled,
			    interval = _props3.interval,
			    max = _props3.max,
			    min = _props3.min,
			    onDragEnd = _props3.onDragEnd,
			    onInputChange = _props3.onInputChange;

			var numValue = Number(value);
			var changedValue = eventType === SLIDER.INPUT_CHANGE ? boundsCheckValue(numValue, min, max) : getIntervalValue(numValue, interval);

			if (disabled) {
				return;
			}

			switch (eventType) {
				case SLIDER.DRAG_END:
				case SLIDER.INPUT_END:
					if (onDragEnd) {
						onDragEnd(numValue);
					}

					break;
				case SLIDER.INPUT_CHANGE:
					this.setDragValues(changedValue, eventType);
					var changeHandler = onInputChange || onDragEnd;

					if (changeHandler) {
						changeHandler(numValue);
					}

					break;
				default:
					this.setDragValues(changedValue, eventType);

					break;
			}
		}

		/**
   * Handles input field changes to the slider
   * @param {object} event Synthetic Event object
   */

	}, {
		key: 'handleDragChange',
		value: function handleDragChange(event) {
			var drag = this.state.drag;


			if (drag) {
				var nextValue = this.getSliderCursorValue(event);

				this.handleChangeEvent(nextValue, SLIDER.DRAG_CHANGE);
			}
		}

		/**
   * Handle slider drag start event
   * @param {object} event Synthetic Event object
   */

	}, {
		key: 'handleDragStart',
		value: function handleDragStart(event) {
			var drag = this.state.drag;

			var nextValue = this.getSliderCursorValue(event);

			if (!drag) {
				this.setState({ drag: true });
				this.handleChangeEvent(nextValue, SLIDER.DRAG_START);
			}
		}

		/**
   * Handle slider drag end event
   */

	}, {
		key: 'handleDragEnd',
		value: function handleDragEnd() {
			var _state = this.state,
			    value = _state.value,
			    drag = _state.drag;


			if (drag) {
				this.setState({ drag: false });
				this.handleChangeEvent(value, SLIDER.DRAG_END);
			}
		}

		/**
   * Handle onchange event of the input
   * @param {string} eventType Defined event type for the slider
   * @param {object} event     Synthetic Event Object
   */

	}, {
		key: 'handleInputEvent',
		value: function handleInputEvent(eventType, event) {
			var keyCode = event.keyCode,
			    which = event.which,
			    target = event.target;

			var keycode = keyCode || which;
			var value = target.value;


			if (keycode === INPUT.ENTER && eventType === SLIDER.INPUT_KEYPRESS) {
				target.blur();
			} else if (eventType === SLIDER.INPUT_CHANGE) {
				this.handleChangeEvent(value, eventType);
			}
		}

		/**
   * Make sure to switch on and off event listeners based on disabled state of the property
   */

	}, {
		key: 'registerEventListeners',
		value: function registerEventListeners() {
			var disabled = this.props.disabled;


			if (!disabled && !this.eventsAdded) {
				this.eventsAdded = true;

				document.addEventListener('mouseup', this.handleDragEnd);
				document.addEventListener('mousemove', this.handleDragChange);
			} else if (disabled && this.eventsAdded) {
				this.eventsAdded = false;

				document.removeEventListener('mouseup', this.handleDragEnd);
				document.removeEventListener('mousemove', this.handleDragChange);
			}
		}

		/**
   * Set in-component drag values
   * @param {number} value     Drag Value
   */

	}, {
		key: 'setDragValues',
		value: function setDragValues(value, eventType) {
			var _props4 = this.props,
			    onDragChange = _props4.onDragChange,
			    onDragEnd = _props4.onDragEnd;

			var isDragChange = eventType === SLIDER.DRAG_CHANGE || eventType === SLIDER.INPUT_CHANGE;
			var isDragEnd = eventType === SLIDER.DRAG_END || eventType === SLIDER.INPUT_END;

			this.setState({ value: value });

			if (isDragChange) {
				onDragChange(value);
			}

			if (isDragEnd) {
				onDragEnd(value);
			}
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var _props5 = this.props,
			    label = _props5.label,
			    value = _props5.value;


			return React.createElement(
				'div',
				{ className: 'slider-data' },
				React.createElement(
					'label',
					null,
					label
				),
				React.createElement(
					'div',
					{ className: 'value' },
					value
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props6 = this.props,
			    disabled = _props6.disabled,
			    onInputChange = _props6.onInputChange;
			var value = this.state.value;

			var _generateSliderInline = generateSliderInline(value),
			    knobPosition = _generateSliderInline.knobPosition,
			    trackCoverWidth = _generateSliderInline.trackCoverWidth;

			var sliderClassnames = sideCatClassnames('slider', {
				'pre-render': value === null,
				disabled: disabled
			});

			return React.createElement(
				'div',
				{ className: sliderClassnames },
				React.createElement(
					'div',
					{ className: 'slider', ref: 'slider', onMouseDown: !disabled && this.handleDragStart },
					React.createElement(
						'div',
						{ className: 'track' },
						React.createElement('div', { className: 'cover', style: trackCoverWidth })
					),
					React.createElement('div', { className: 'knob', style: knobPosition })
				),
				onInputChange && React.createElement('input', { onChange: this.handleInputEvent.bind(this, SLIDER.INPUT_CHANGE) })
			);
		}
	}]);
	return Slider;
}(BaseComponent);

/**
 *  * @type {number}        defaultValue  Default starting value for a slider
 *  * @type {boolean}       disabled      Indication of disabled state and styles
 *  * @type {number}        interval      Step size between acceptable values
 *  * @type {number}        max           Max value for slider
 *  * @type {number}        min           Minimum value for slider
 *  * @type {function}      onDragChange  Event handler for drag change
 *  * @type {function}      onDragEnd     Event handler for drag end
 *  * @type {function}      onInputChange Event handler for input value change
 *  * @type {number|string} value         Value being modified by slider
 */


Slider.propTypes = {
	defaultValue: PropTypes.number,
	disabled: PropTypes.bool,
	interval: PropTypes.number,
	max: PropTypes.number,
	min: PropTypes.number,
	onDragChange: PropTypes.func,
	onDragEnd: PropTypes.func,
	onInputChange: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Slider.defaultProps = {
	defaultValue: 0,
	interval: 1
};

var Sidebar = function (_BaseComponent) {
	inherits(Sidebar, _BaseComponent);

	function Sidebar(props) {
		classCallCheck(this, Sidebar);
		return possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));
	}

	/**
  * Renders Categories component based on CategoriesModel
  * @param   {CategoriesModel} structItem Categories model structure config
  * @returns {Categories}                 Returns Categories Component
  */


	createClass(Sidebar, [{
		key: 'renderCategories',
		value: function renderCategories(structItem) {
			var handleCategoryChange = this.props.handleCategoryChange;

			var _structItem$serialize = structItem.serialize(),
			    active = _structItem$serialize.active,
			    name = _structItem$serialize.name,
			    categories = _structItem$serialize.categories;

			return React.createElement(Categories, {
				key: name,
				active: active,
				categories: categories,
				onChange: this.bindParams(handleCategoryChange, name) });
		}

		/**
   * Renders checkbox based on CheckBoxModel
   * @param   {CheckBoxModel} structItem CheckBox model structure configuration
   * @returns {Checkbox}                 Returns CheckBox Component
   */

	}, {
		key: 'renderCheckBox',
		value: function renderCheckBox(structItem) {
			var handleCheckBoxChange = this.props.handleCheckBoxChange;

			var _structItem$serialize2 = structItem.serialize(),
			    label = _structItem$serialize2.label,
			    name = _structItem$serialize2.name;

			return React.createElement(CheckBox, {
				key: name,
				label: label,
				onChange: this.bindParams(handleCheckBoxChange, name) });
		}

		/**
   * Renders Slider based on SliderModel
   * @param   {SliderModel} structItem Slider model structure configuration
   * @returns {Slider}                 Returns Slider Component
   */

	}, {
		key: 'renderSlider',
		value: function renderSlider(structItem) {
			var _props = this.props,
			    handleSliderDragChange = _props.handleSliderDragChange,
			    handleSliderDragEnd = _props.handleSliderDragEnd,
			    valueState = _props.valueState;

			var _structItem$serialize3 = structItem.serialize(),
			    max = _structItem$serialize3.max,
			    min = _structItem$serialize3.min,
			    name = _structItem$serialize3.name;

			var value = valueState[name];

			return React.createElement(Slider, {
				key: name,
				max: max,
				min: min,
				onDragChange: this.bindParams(handleSliderDragChange, name),
				onDragEnd: this.bindParams(handleSliderDragEnd, name),
				value: value });
		}
	}, {
		key: 'renderSidebarComponents',
		value: function renderSidebarComponents() {
			var _this2 = this;

			var structList = this.props.structList;


			return structList.map(function (structItem) {
				switch (structItem.constructor.Structure) {
					case Models.CategoriesModel.Structure:
						return _this2.renderCategories(structItem);
					case Models.CheckBoxModel.Structure:
						return _this2.renderCheckBox(structItem);
					case Models.SliderModel.Structure:
						return _this2.renderSlider(structItem);
					default:
						break;
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var sideBarClass = sideCatClassnames('sidebar');

			return React.createElement(
				'div',
				{ className: sideBarClass },
				this.renderSidebarComponents()
			);
		}
	}]);
	return Sidebar;
}(BaseComponent);

/**
 * propTypes definition
 * @property (function} handleCheckBoxChange   Handle checkbox change events
 * @property (function} handleSliderDragChange Handle slider drag change events
 * @property (function} handleSliderDragEnd    Handle slider drag end events
 * @property {array}    structList             Order of sidebar components
 */


Sidebar.propTypes = {
	handleCheckBoxChange: PropTypes.func,
	handleSliderDragChange: PropTypes.func,
	handleSliderDragEnd: PropTypes.func,
	structList: PropTypes.array
};

export { Models, Sidebar };
