import React from "react";
import { connect } from "react-redux";

import DirectoryItem from "../Directory-item/Directory-item";
import "./Directory.scss";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <DirectoryItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  sections: state.directory.sections
});

export default connect(mapStateToProps)(Directory);
