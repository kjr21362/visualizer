import React from "react";
import "./Board.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 500;
const start_x = 5;
const start_y = HEIGHT / 2;
const end_x = WIDTH - 5;
const end_y = HEIGHT / 2;

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
