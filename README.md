# ScrollableList Component

A React component for creating a scrollable list that supports infinite scrolling. This component is highly customizable and easy to use in your projects.

## Installation

To install the `ScrollableList` component, you can use npm or yarn:

```bash
npm install @aymvn/react-scrollable-list
```

## Usage

```jsx
import React from "react"
import { ScrollableList } from "@aymvn/react-scrollable-list"

const items = [
	{
		id: 1,
		name: "Item 1",
	},
	{
		id: 2,
		name: "Item 2",
	},
]

const renderItem = (item, index) => <div key={index}>{item.name}</div>

const App = () => {
	const handleEndReached = () => {
		console.log("End of list reached")
	}

	return (
		<ScrollableList
			items={items}
			renderItem={renderItem}
			onEndReached={handleEndReached}
			loading={false}
			endReachedThreshold={20}
			containerClassNames="your-container-class"
			containerStyles={{ height: "500px" }}
			loadingElement={<div>Loading...</div>}
		/>
	)
}

export default App
```

## Props

The ScrollableList component accepts the following props:

-   **items:** An array of items to render in the list.
-   **renderItem:** A function to render each item.
-   **onEndReached:** A callback function that is called when the end of the list is reached or near.
-   **endReachedThreshold:** The threshold (in pixels) from the end of the scrollable content at which the onEndReached callback should be triggered.
-   **loading:** A boolean indicating if a loading indicator should be displayed.
-   **containerClassNames:** An optional class name to apply to the container element.
-   **containerStyles:** An optional style object to apply to the container element.
-   **loadingElement:** An optional JSX element to display while loading.

## Example

Here's an example of how to use the ScrollableList component:

```jsx
import React, { useState } from "react"
import ScrollableList from "your-package-name"

const ExampleComponent = () => {
	const [items, setItems] = useState([...initialItems])
	const [loading, setLoading] = useState(false)

	const fetchMoreItems = () => {
		setLoading(true)
		// Simulate a network request
		setTimeout(() => {
			setItems((prevItems) => [...prevItems, ...newItems])
			setLoading(false)
		}, 1000)
	}

	const renderItem = (item, index) => <div key={index}>{item}</div>

	return <ScrollableList items={items} renderItem={renderItem} onEndReached={fetchMoreItems} loading={loading} />
}

export default ExampleComponent
```

## License

This project is licensed under the MIT License.
