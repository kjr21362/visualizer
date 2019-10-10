import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { startTimer, stopTimer } from "../redux/timer/timer.actions";
import {
  toggleStopButton,
  toggleClearButton,
  toggleAddintObstacleState,
  clearObstacles
} from "../redux/runButton/runButton.action";

class Header extends React.Component {
  render() {
    const options = ["DFS", "BFS"];
    const { isRunning, dispatch, searchDone, isAddingObstacles } = this.props;
    if (searchDone) {
      dispatchWhenStop(this.props);
    }
    return (
      <div className="ui secondary pointing menu">
        <a href="/" className="item">
          Visualizer
        </a>
        <Dropdown options={options} />
        <button
          className="ui primary button"
          onClick={() => {
            isRunning ? dispatchWhenStop(this.props) : dispatch(startTimer());
          }}
        >
          {isRunning ? "Stop!" : "Run!"}
        </button>
        <button
          className="ui primary button"
          onClick={() => {
            dispatchWhenClear(this.props);
          }}
        >
          Clear!
        </button>
        <button
          className="ui primary button"
          onClick={() => {
            this.props.dispatch(toggleAddintObstacleState());
          }}
        >
          {isAddingObstacles ? "Drag to add obstacles!" : "Add Obstacles!"}
        </button>
        <button
          className="ui primary button"
          onClick={() => {
            this.props.dispatch(clearObstacles());
          }}
        >
          Clear Obstacles!
        </button>
      </div>
    );
  }
}

const dispatchWhenClear = props => {
  props.dispatch(stopTimer());
  props.dispatch(toggleClearButton());
};

const dispatchWhenStop = props => {
  props.dispatch(stopTimer());
  props.dispatch(toggleStopButton());
};

const mapStateToProps = state => ({
  isRunning: state.runButton.isRunning,
  searchDone: state.runButton.searchDone,
  isAddingObstacles: state.runButton.isAddingObstacles
});

export default connect(mapStateToProps)(Header);
