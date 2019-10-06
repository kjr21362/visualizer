import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { startTimer } from "../redux/timer/timer.actions";

const Header = ({ dispatch }) => {
  const options = ["DFS", "BFS"];

  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
        Visualizer
      </a>
      <Dropdown options={options} />
      <button
        className="ui primary button"
        onClick={() => {
          dispatch(startTimer());
        }}
      >
        Run!
      </button>
    </div>
  );
};

//const mapDispatchToProps = dispatch => ({
//  toggleRunButton: () => dispatch(toggleRunButton()),
//  runTimer: () => dispatch(runTimer())
//});

export default connect()(Header);
