import React from "react";
import Header from "../components/Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import SortPage from "./SortPage";
import Directory from "../components/Directory/Directory";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Directory} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/sort" exact component={SortPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
