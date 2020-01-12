import React from "react";
import "./Cell.css";
import constants from "../../utils/constants";

const CELL_SIZE = constants.CELL_SIZE;

class Cell extends React.Component {
  render() {
    const { x, y, color, key } = this.props;
    return (
      <div
        className="Cell"
        key={key}
        style={{
          left: `${x + 1}px`,
          top: `${y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
          backgroundColor: `${color}`
        }}
      ></div>
    );
  }
}

export default Cell;
