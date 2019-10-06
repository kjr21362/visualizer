import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { startTimer, stopTimer } from "../redux/timer/timer.actions";
import { toggleStopButton } from "../redux/runButton/runButton.action";

class Header extends React.Component {
  render() {
    const options = ["DFS", "BFS"];
    const { isRunning, dispatch } = this.props;
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
      </div>
    );
  }
}

const dispatchWhenStop = props => {
  props.dispatch(stopTimer());
  props.dispatch(toggleStopButton());
};

const mapStateToProps = state => ({
  isRunning: state.runButton.isRunning
});

export default connect(mapStateToProps)(Header);
