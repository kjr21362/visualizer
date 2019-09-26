import React from "react";
import "./Board.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 500;

class Board extends React.Component {
	render() {
		return (
			<div
				className="Board"
				style={{
					width: WIDTH,
					height: HEIGHT,
					backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
				}}
			></div>
		);
	}
}

export default Board;
