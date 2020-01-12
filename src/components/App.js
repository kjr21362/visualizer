import React from "react";
import Header from "../components/Header/Header";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import SearchPage from "./SearchPage";
import SortPage from "./SortPage";
import Directory from "../components/Directory/Directory";
import constants from "../utils/constants";
const APP_NAME = constants.APP_NAME;

const App = () => {
  return (
    <div className="ui container">
      <HashRouter basename="/">
        <div>
          <Header />
          <Route path="/" exact component={Directory} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/sort" exact component={SortPage} />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
