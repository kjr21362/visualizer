import React from "react";
import "./Cell.css";

const CELL_SIZE = 20;

class Cell extends React.Component {
	render() {
		const { x, y } = this.props;
		console.log("cell");
		console.log(x);
		console.log(y);
		return (
			<div
				className="Cell"
				style={{
					left: `${x + 1}px`,
					top: `${y + 1}px`,
					width: `${CELL_SIZE - 1}px`,
					height: `${CELL_SIZE - 1}px`,
					backgroundColor: "white"
				}}
			></div>
		);
	}
}

export default Cell;
