import { combineReducers } from "redux";

import directoryReducer from "../redux/directory/directory.reducer";
import searchReducer from "../redux/search/search.reducer";
import sortReducer from "../redux/sort/sort.reducer";

const rootReducer = combineReducers({
  directory: directoryReducer,
  searchReducer: searchReducer,
  sortReducer: sortReducer
});

export default rootReducer;
