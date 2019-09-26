import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Header = () => {
	const options = ["DFS", "BFS"];

	return (
		<div className="ui secondary pointing menu">
			<a href="/" className="item">
				Visualizer
			</a>
			<Dropdown options={options} />
			<button className="ui primary button">Run!</button>
		</div>
	);
};

export default Header;
