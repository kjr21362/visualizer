import React from "react";
import Header from "../components/Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import SortPage from "./SortPage";
import Directory from "../components/Directory/Directory";
import constants from "../utils/constants";
const APP_NAME = constants.APP_NAME;

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path={"/" + APP_NAME} exact component={Directory} />
          <Route
            path={"/" + APP_NAME + "/search"}
            exact
            component={SearchPage}
          />
          <Route path={"/" + APP_NAME + "/sort"} exact component={SortPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
