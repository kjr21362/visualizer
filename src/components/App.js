import React from "react";
import Header from "./Header";
import Board from "./Board";
import Timer from "./timer";

const App = () => {
  return (
    <div className="ui container">
      <div>
        <Header />
      </div>
      <div>
        <Board />
      </div>
      <div>
        <Timer />
      </div>
    </div>
  );
};

export default App;
