import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { startTimer, stopTimer } from "../redux/timer/timer.actions";
import {
  toggleStopButton,
  toggleClearButton
} from "../redux/runButton/runButton.action";

class Header extends React.Component {
  render() {
    const options = ["DFS", "BFS"];
    const { isRunning, dispatch, searchDone } = this.props;
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
  searchDone: state.runButton.searchDone
});

export default connect(mapStateToProps)(Header);
