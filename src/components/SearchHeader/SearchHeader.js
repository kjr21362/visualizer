import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./SearchHeader.css";
import {
  startTimerForAction,
  stopTimerForAction
} from "../../redux/timer/timer.actions";
import {
  toggleStopButton,
  toggleClearButton,
  toggleAddintObstacleState,
  clearObstacles,
  selectSearchAlgorithm,
  selectMazeAlgorithm,
  generateMaze
} from "../../redux/search/search.action";
import constants from "../../utils/constants";

const search_options = constants.SEARCH_OPTIONS;
const maze_options = constants.MAZE_OPTIONS;

class SearchHeader extends React.Component {
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
            isRunning
              ? dispatchWhenStop(this.props)
              : startTimerForAction(this.props.dispatch, constants.SEARCH);
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
  //props.dispatch(stopTimer());
  stopTimerForAction(props.dispatch, constants.SEARCH);
  props.dispatch(toggleClearButton());
};

const dispatchWhenStop = props => {
  //props.dispatch(stopTimer());
  stopTimerForAction(props.dispatch, constants.SEARCH);
  props.dispatch(toggleStopButton());
};

const mapStateToProps = state => ({
  isRunning: state.searchReducer.isRunning,
  searchDone: state.searchReducer.searchDone,
  isAddingObstacles: state.searchReducer.isAddingObstacles
});

export default connect(mapStateToProps)(SearchHeader);
