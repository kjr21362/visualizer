import React from "react";
import { withRouter } from "react-router-dom";
import "./Directory-item.scss";

const DirectoryItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} directory-item`}
    onClick={() => history.push(`${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
    </div>
  </div>
);

export default withRouter(DirectoryItem);
