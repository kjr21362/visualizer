import React from "react";
import { connect } from "react-redux";
import "./Board.css";
import Cell from "./Cell";
import key from "weak-key";

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
          key="START_CELL"
          color="white"
        ></Cell>
        <Cell
          x={END_X * CELL_SIZE}
          y={END_Y * CELL_SIZE}
          color="green"
          key="END_CELL"
        ></Cell>
        {pathCells.length ? (
          pathCells.map(pathCell => (
            <Cell
              x={pathCell.x * CELL_SIZE}
              y={pathCell.y * CELL_SIZE}
              key={key(pathCell)}
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
