import React from "react";
import { connect } from "react-redux";
import "./SortBoard.css";
import Cell from "../Cell/Cell";
import key from "weak-key";
import constants from "../../utils/constants";

const CELL_SIZE = constants.CELL_SIZE;
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

class SortBoard extends React.Component {
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

  render() {
    const {
      searchCells,
      path,
      target,
      obstacles,
      toggleAddintObstacleState,
      isAddingObstacles,
      currentAlgorithm
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchCells: state.sortReducer.cells
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SortBoard);
