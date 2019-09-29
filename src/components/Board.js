import React from "react";
import "./Board.css";
import Cell from "./Cell";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 500;
const START_X = 4;
const START_Y = 10;
const END_X = 37;
const END_Y = 10;

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}
	state = {
		start_x: START_X,
		start_y: START_Y,
		end_x: END_X,
		end_y: END_Y,
		cells: []
	};

	getOffset() {
		const rect = this.ref.current.getBoundingClientRect();
		const doc = document.documentElement;

		return {
			start_x: rect.left + window.pageXOffset - doc.clientLeft,
			start_y: rect.top + window.pageYOffset - doc.clientTop
		};
	}

	handleClick(e) {
		var rect = e.target.getBoundingClientRect();
		//var x = e.clientX - rect.left;
		//var y = e.clientY - rect.top;
		//console.log(Math.floor(x / CELL_SIZE));
		//console.log(Math.floor(y / CELL_SIZE));
		//console.log(rect.left);
	}

	componentDidMount() {
		console.log(this.ref.current.getBoundingClientRect());
		const rect = this.ref.current.getBoundingClientRect();
		this.setState({
			start_x: START_X * CELL_SIZE,
			start_y: START_Y * CELL_SIZE,
			end_x: END_X * CELL_SIZE,
			end_y: END_Y * CELL_SIZE
		});
	}

	render() {
		const { start_x, start_y, end_x, end_y } = this.state;
		console.log(start_x);
		console.log(start_y);

		return (
			<div
				ref={this.ref}
				onClick={this.handleClick}
				className="Board"
				style={{
					width: WIDTH,
					height: HEIGHT,
					backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
				}}
			>
				<Cell x={start_x} y={start_y}></Cell>
				<Cell x={end_x} y={end_y}></Cell>
			</div>
		);
	}
}

export default Board;
