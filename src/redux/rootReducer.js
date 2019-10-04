import { combineReducers } from "redux";

import runButtonReducer from "./runButton/runButton.reducer";

const rootReducer = combineReducers({
  runButton: runButtonReducer
});

export default rootReducer;
