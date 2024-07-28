import { HTMLProps } from "react"

interface ScrollableListProps<T> {
	/**
	 * The list of items to render.
	 */
	items: T[]

	/**
	 * A function to render each item.
	 * @param item - The item to render.
	 * @param index - The index of the item in the list.
	 * @returns A JSX element representing the rendered item.
	 */
	renderItem: (item: T, index: number) => JSX.Element

	/**
	 * A callback function that is called when the end of the list is reached/near.
	 * By default, the callback is triggered when the scroll position is within 10 pixels of the end of the list.
	 * This can be customized using the `endReachedThreshold` prop.
	 */
	onEndReached: () => void

	/**
	 * The threshold (in pixels) from the end of the scrollable content at which
	 * the `onEndReached` callback should be triggered.
	 * @default 10
	 */
	endReachedThreshold?: number

	/**
	 * A boolean indicating if a loading indicator should be displayed.
	 */
	loading?: boolean

	/**
	 * An optional class name to apply to the container element.
	 */
	containerClassNames?: HTMLProps<HTMLElement>["className"]

	/**
	 * An optional style object to apply to the container element.
	 * @default { overflowY: "auto", height: "100vh", width: "100%", position: "relative" }
	 */
	containerStyles?: HTMLProps<HTMLElement>["style"]

	/**
	 * An optional JSX element to display while loading, defaults to `<p>Loading...</p>`.
	 * @default <p>Loading...</p>
	 */
	loadingElement?: React.ReactElement<any, any>
}

/**
 * A scrollable list component that supports infinite scrolling.
 */
const ScrollableList = <T,>({
	items,
	renderItem,
	onEndReached,
	endReachedThreshold,
	loading,
	loadingElement,
	containerClassNames,
	containerStyles,
}: ScrollableListProps<T>) => {
	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

		// Calculate the threshold for when to trigger the endReached callback
		const threshold = endReachedThreshold ?? 10
		const buffer = 10 // Optional buffer to ensure callback is called before reaching the end

		if (scrollHeight - scrollTop <= clientHeight + threshold + buffer) {
			if (typeof onEndReached === "function") {
				// Prevent multiple calls if already fetching
				if (!loading) {
					onEndReached()
				}
			}
		}
	}

	/*
        The LoadingElement component is a simple loading indicator that displays the text "Loading..." in the center of the container.
    */
	const LoadingElement = () => (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
				padding: "1rem",
			}}
		>
			<p>Loading...</p>
		</div>
	)

	return (
		<>
			<div
				className={containerClassNames ?? ""}
				style={{
					overflowY: "auto",
					height: "100vh",
					width: "100%",
					position: "relative",
					...containerStyles,
				}}
				onScroll={handleScroll}
			>
				{items.map((item, index) => (
					<div key={index}>{renderItem(item, index)}</div>
				))}
			</div>
			{loading && (loadingElement ?? <LoadingElement />)}
		</>
	)
}

export default ScrollableList
