import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { startTimer, stopTimer } from "../redux/timer/timer.actions";
import {
  toggleStopButton,
  toggleClearButton,
  toggleAddintObstacleState,
  clearObstacles,
  selectSearchAlgorithm,
  selectMazeAlgorithm,
  generateMaze
} from "../redux/runButton/runButton.action";
import constants from "../utils/constants";

const search_options = constants.SEARCH_OPTIONS;
const maze_options = constants.MAZE_OPTIONS;

class Header extends React.Component {
  _onSelect(option) {
    //console.log(option.label);
    this.props.dispatch(selectSearchAlgorithm(option.label));
  }
  render() {
    const { isRunning, dispatch, searchDone, isAddingObstacles } = this.props;
    if (searchDone) {
      dispatchWhenStop(this.props);
    }
    return (
      <div className="ui secondary pointing menu">
        <a href="/" className="item">
          Visualizer
        </a>
        <Dropdown
          options={search_options}
          value={search_options[0]}
          onChange={option => {
            this.props.dispatch(selectSearchAlgorithm(option.label));
          }}
        />
        <Dropdown
          options={maze_options}
          value={maze_options[0]}
          onChange={option => {
            this.props.dispatch(selectMazeAlgorithm(option.label));
          }}
        />
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
        <button
          className="ui primary button"
          onClick={() => {
            this.props.dispatch(generateMaze());
          }}
        >
          Generate Maze!
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
