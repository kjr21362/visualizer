import React from "react";
import { connect } from "react-redux";
import "./Board.css";
import Cell from "./Cell";
import key from "weak-key";
import { dragTarget } from "../redux/runButton/runButton.action";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 500;
const START_X = 4;
const START_Y = 10;

class Board extends React.Component {
  updateTargetOnDrag = e => {
    const { dragTarget } = this.props;

    var rect = this.boardRef.getBoundingClientRect();
    var doc = document.documentElement;
    var offset_x = rect.left + window.pageXOffset - doc.clientLeft;
    var offset_y = rect.top + window.pageYOffset - doc.clientTop;

    var x = e.clientX - offset_x;
    var y = e.clientY - offset_y;
    dragTarget({
      x: Math.floor(x / CELL_SIZE),
      y: Math.floor(y / CELL_SIZE)
    });
  };
  render() {
    const { searchCells, path, target } = this.props;

    return (
      <div
        className="Board"
        ref={n => {
          this.boardRef = n;
        }}
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

        <div draggable="true" onDragEnd={this.updateTargetOnDrag}>
          <Cell
            x={target.x * CELL_SIZE}
            y={target.y * CELL_SIZE}
            color="green"
            key="END_CELL"
          ></Cell>
        </div>
        {searchCells.length ? (
          searchCells.map(pathCell => (
            <Cell
              x={pathCell.x * CELL_SIZE}
              y={pathCell.y * CELL_SIZE}
              key={key(pathCell)}
            />
          ))
        ) : (
          <span></span>
        )}
        {path.length ? (
          path.map(cell => (
            <Cell
              x={cell.x * CELL_SIZE}
              y={cell.y * CELL_SIZE}
              key={key(cell)}
              color="green"
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
  searchCells: state.runButton.cells,
  path: state.runButton.path,
  target: state.runButton.target
});

const mapDispatchToProps = dispatch => ({
  dragTarget: newPos => dispatch(dragTarget(newPos))
});

const screenCoordsToClientCoords = e => {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return { x: Math.floor(x / CELL_SIZE), y: Math.floor(y / CELL_SIZE) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
