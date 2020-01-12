import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import constants from "../../utils/constants";
const APP_NAME = constants.APP_NAME;

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1 className="ui header">
          <Link to="/" className="item">
            Visualizer
          </Link>
        </h1>
      </div>
    );
  }
}

export default Header;
