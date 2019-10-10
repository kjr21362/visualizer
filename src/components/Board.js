import React from "react";
import { connect } from "react-redux";
import "./Board.css";
import Cell from "./Cell";
import key from "weak-key";
import constants from "../utils/constants";
import {
  dragTarget,
  addObstacle,
  toggleAddintObstacleState
} from "../redux/runButton/runButton.action";

const CELL_SIZE = constants.CELL_SIZE;
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;
const START_X = constants.START_X;
const START_Y = constants.START_Y;

class Board extends React.Component {
  getBoardCoords = e => {
    var rect = this.boardRef.getBoundingClientRect();
    var doc = document.documentElement;
    var offset_x = rect.left + window.pageXOffset - doc.clientLeft;
    var offset_y = rect.top + window.pageYOffset - doc.clientTop;

    var x = e.clientX - offset_x;
    var y = e.clientY - offset_y;
    return [x, y];
  };
  updateTargetOnDrag = e => {
    const { dragTarget } = this.props;
    var [x, y] = this.getBoardCoords(e);
    dragTarget({
      x: Math.floor(x / CELL_SIZE),
      y: Math.floor(y / CELL_SIZE)
    });
  };

  addObstacles = e => {
    const { addObstacle, isAddingObstacles } = this.props;
    if (isAddingObstacles) {
      var [x, y] = this.getBoardCoords(e);
      addObstacle({
        x: Math.floor(x / CELL_SIZE),
        y: Math.floor(y / CELL_SIZE)
      });
    }
  };

  render() {
    const {
      searchCells,
      path,
      target,
      obstacles,
      toggleAddintObstacleState,
      isAddingObstacles
    } = this.props;

    return (
      <div
        onMouseDown={e => {
          if (isAddingObstacles) {
            this.addObstacles(e);
            this.boardRef.onmousemove = this.addObstacles;
          }
        }}
        onMouseUp={() => {
          if (isAddingObstacles) {
            this.boardRef.onmousemove = null;
            toggleAddintObstacleState();
          }
        }}
        className="Board"
        id="Board"
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
          searchCells.map(pathCell =>
            pathCell.x !== START_X || pathCell.y !== START_Y ? (
              <Cell
                x={pathCell.x * CELL_SIZE}
                y={pathCell.y * CELL_SIZE}
                key={key(pathCell)}
              />
            ) : (
              <span></span>
            )
          )
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
        {obstacles.map((row, r_index) =>
          row.map((ele, c_index) =>
            ele ? (
              <Cell
                x={c_index * CELL_SIZE}
                y={r_index * CELL_SIZE}
                color="grey"
              />
            ) : (
              <span></span>
            )
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchCells: state.runButton.cells,
  path: state.runButton.path,
  target: state.runButton.target,
  obstacles: state.runButton.obstacles,
  isAddingObstacles: state.runButton.isAddingObstacles
});

const mapDispatchToProps = dispatch => ({
  dragTarget: newPos => dispatch(dragTarget(newPos)),
  addObstacle: newObstacle => dispatch(addObstacle(newObstacle)),
  toggleAddintObstacleState: () => dispatch(toggleAddintObstacleState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
