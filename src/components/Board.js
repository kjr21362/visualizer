import React from "react";
import { connect } from "react-redux";
import "./Board.css";
import Cell from "./Cell";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 500;
const START_X = 4;
const START_Y = 10;
const END_X = 37;
const END_Y = 10;
const N_ROWS = 25;
const N_COLS = 40;

class Board extends React.Component {
  render() {
    const { pathCells } = this.props;

    return (
      <div
        className="Board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
        }}
      >
        <Cell
          x={START_X * CELL_SIZE}
          y={START_Y * CELL_SIZE}
          key={START_X * N_ROWS + START_Y * N_COLS}
          color="white"
        ></Cell>
        <Cell
          x={END_X * CELL_SIZE}
          y={END_Y * CELL_SIZE}
          color="green"
          key={END_X * N_ROWS + END_Y * N_COLS}
        ></Cell>
        {pathCells.length ? (
          pathCells.map(pathCell => (
            <Cell
              x={pathCell.x * CELL_SIZE}
              y={pathCell.y * CELL_SIZE}
              key={pathCell.x * N_ROWS + pathCell.y * N_COLS}
            />
          ))
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathCells: state.runButton.cells,
  isRunning: state.isRunning
});

export default connect(mapStateToProps)(Board);
