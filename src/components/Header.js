import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toggleRunButton } from "../redux/runButton/runButton.action";

const Header = ({ toggleRunButton }) => {
  const options = ["DFS", "BFS"];

  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
        Visualizer
      </a>
      <Dropdown options={options} />
      <button className="ui primary button" onClick={toggleRunButton}>
        Run!
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleRunButton: () => dispatch(toggleRunButton())
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
