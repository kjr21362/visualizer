import React from "react";
import Header from "./Header";
import Board from "./Board";

const App = () => {
  return (
    <div className="ui container">
      <div>
        <Header />
      </div>
      <div>
        <Board />
      </div>
    </div>
  );
};

export default App;
