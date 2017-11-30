# SideCat
Sidecat is an unit tested sidebar result catalogue library that strives to solve a very common problem
using a set of generic rules and expected cases while also enabling users to override the components 
provided to enable developers greater control but also speedy scaffolding for any project.

## Installation

Currently in beta testing phase prior to publishing this package to NPM installation is relegated to manually referencing this github URL
`git+ssh://git@github.com:SideCatt/SideCat.git` in your package.json under the library name `sidecat`

## Installing Dependencies

Once you have pulled down the project you must install dependencies via npm.  This can be done by running `yarn` or `npm install` at the project root.

## Modules

### Components 

#### Sidebar
**Props:**

| Name                    | Type               | Description                                                                 |
| ----------------------- | ------------------ | --------------------------------------------------------------------------- |
| onCategoryChange        | function           | Event handler for cateogory change events                                   |
| onChange                | function           | Event handler for change events coming from any components inside `Sidebar` |
| onCheckBoxChange        | function           | Event handler for checkbox change events                                    |
| onSliderDragChange      | function           | Event handler for changing the slider value                                 |
| onSliderDragEnd         | function           | Event handler for the end of a slider drag                                  |
| structList              | array              | Ordered list of data models present for the sidebar                         |
| valueState              | object             | Name keyed value state for the data models in sidebar                       |

### Models

#### Category
**Params:**

| Name                    | Type               | Description                                                     |
| ----------------------- | ------------------ | --------------------------------------------------------------- |
| value                   | any                | Unique value for the category to be referenced for active state |
| label                   | string             | Human legible label for what the category represents            |
| children                | array|null         | Array of category models for nested categories                  |

**Example:**

```javascript
const myCategory = new Models.CategoryModel({ value: 'category1', label: 'Sam and Jon are the best' });
```

#### Categories
**Params:**

| Name                    | Type               | Description                                                     |
| ----------------------- | ------------------ | --------------------------------------------------------------- |
| name                    | string             | UID for referencing the corresponding module in sidebar         |
| categories              | array              | Array of Category models to select from, can be nested or flat  |

**Example:**

```javascript
const myCategories = new Models.CategoriesModel({
	name: 'cat1',
	categories: [
		new Models.CategoryModel({ value: 'category1', label: 'Sam and Jon are the best' }),
		new Models.CategoryModel({ value: 'category2', label: 'Better than the rest' })
	]
});
```

#### CheckBox
**Params:**

| Name                    | Type               | Description                                                     |
| ----------------------- | ------------------ | --------------------------------------------------------------- |
| name                    | string             | UID for referencing the corresponding module in sidebar         |
| label                   | string             | Human legible label for what the checkbox represents            |

**Example:**

```javascript
const myCheckbox = new Models.CheckBoxModel({
	label: 'checkbox',
	name: 'check_box',
});
```

#### Slider
**Params:**

| Name                    | Type               | Description                                                     |
| ----------------------- | ------------------ | --------------------------------------------------------------- |
| name                    | string             | UID for referencing the corresponding module in sidebar         |
| label                   | string             | Human legible label for what the checkbox represents            |
| max                     | number             | Maximum possible value allowed on the slider                    |
| min                     | number             | Minimum possible value allowed on the slider                    |

**Example:**

```javascript
const mySlider = new Models.SliderModel({
	label: 'bar slider',
	name: 'bar_slider',
	max: 100,
	min: 0
});
```

## Usage

### Sidebar

#### Construction
The sidebar will dynamically create an ordered sidebar based on the configuration and the order of the `structList` that is passed to the component.
The struct list should be an array of model types, and the components themselves will be built and returned in that order. Each usable struct should have
a unique name that corresponds to its expected component returned by the sidebar. This will be a reference for state updates if the user should want to
override the in component state and it will be bound to the handler methods as their first .

```javascript
const myCheckbox = new Models.CheckBoxModel({
	label: 'checkbox',
	name: 'check_box',
});
const mySlider = new Models.SliderModel({
	label: 'bar slider',
	name: 'bar_slider',
	max: 100,
	min: 0
});
const mySliderTwo = new Models.SliderModel({
	label: 'bar slider two',
	name: 'bar_slider_two',
	max: 100,
	min: 0
});
const structList = [
	myCheckbox,
	mySlider,
	mySliderTwo
];
```

The corresponding stateful values should be passed similar to react state with name corresponding to property name.

```javascript
const myState = {
	check_box: true,
	bar_slider: 58,
	bar_slider_two: 92
};
```

Using `myStructList` and contents inside `myState`, you can generate our `Sidebar` component as following:
```javascript
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            check_box: true,
            bar_slider: 58,
            bar_slider_two: 92
        };
    }
    
    render() {
        return (
            <Sidebar
                structList={ myStructList }
                valueState={ this.state }>
        );
    }
}
```

You can add an `onChange` prop in `Sidebar` to handle all the emitted events coming from the changes inside the Sidebar component and bind it to your state.
```javascript
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            check_box: true,
            bar_slider: 58,
            bar_slider_two: 92
        };
    }
    
    onChange(name, value) {
        this.setState({ [ name ]: value });
    }
    
    render() {
        return (
            <Sidebar
                onChange={ this.onChange.bind(this) }
                structList={ myStructList }
                valueState={ this.state }>
        );
    }
}
```

## Testing

### Manual
Inside the project there is an Example.jsx file that details an example usage of the sidecat library. This utilizes many of the above described examples for instruction
purposes. This can be live modified and examined via running `yarn dev` in the root directory.

### Unit
Sidecat uses the jest testing library to test components for their state transfers and callbacks and our models/prop library for validation and creation.
Tests can be run from using the node script `test`. These tests will pass or fail on improper linting and unexpected outcomes.