import sortTypes from "./sort.types";
import { runSortAlgorithm, arrayToCells } from "../../utils/utils";
import constants from "../../utils/constants";

const N_HORIZONTAL_CELLS = constants.N_HORIZONTAL_CELLS;
const N_VERTICAL_CELLS = constants.N_VERTICAL_CELLS;

const INITIAL_STATE = {
  isRunning: false,
  searchDone: false,
  sortAlgorithm: "",
  cells: [],
  originalArray: Array.from({ length: N_HORIZONTAL_CELLS }, () =>
    Math.floor(Math.random() * N_VERTICAL_CELLS)
  ),
  sortIndex: 0
};

const sortReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case sortTypes.RUN_SORT:
      var nextArray = [];
      var idx = 0;
      //var isRunning = true;
      var sortDone = false;
      [nextArray, idx] = runSortAlgorithm(state);
      var nextCells = arrayToCells(nextArray);
      if (idx >= nextArray.length) {
        //isRunning = false;
        sortDone = true;
      }
      return {
        ...state,
        cells: nextCells,
        sortIndex: idx,
        isRunning: true,
        searchDone: sortDone
      };

    case sortTypes.STOP_SORT:
      return {
        ...state,
        isRunning: false
      };
    case sortTypes.CLEAR_SORT:
      var nextCells = [];
      var array = Array.from({ length: N_HORIZONTAL_CELLS }, () =>
        Math.floor(Math.random() * N_VERTICAL_CELLS)
      );

      nextCells = arrayToCells(array);

      return {
        ...state,
        isRunning: false,
        searchDone: true,
        sortIndex: 0,
        originalArray: array,
        cells: nextCells
      };

    case sortTypes.SELECT_SORT_ALGORITHM:
      var arrayCells = arrayToCells(state.originalArray);

      return {
        ...state,
        cells: arrayCells,
        sortAlgorithm: action.payload,
        sortIndex: 0
      };
    default:
      return state;
  }
};

export default sortReducer;
