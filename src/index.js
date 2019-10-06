import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/rootReducer";
import logger from "redux-logger";
import timerMiddleware from "redux-timer";

const middlewares = [timerMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

//const store = createStore(rootReducer, applyMiddleware(...middlewares));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
