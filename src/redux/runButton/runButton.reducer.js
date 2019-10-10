import runButtonTypes from "./runButton.types";
import { runSearchAlgorithm, generatePath } from "../../utils/utils";
import constants from "../../utils/constants";

const N_ROWS = constants.N_ROWS;
const N_COLS = constants.N_COLS;
const START_X = constants.START_X;
const START_Y = constants.START_Y;
const END_X = constants.END_X;
const END_Y = constants.END_Y;
var init_visited = Array.from({ length: N_COLS }, () =>
  Array.from({ length: N_ROWS }, () => false)
);

var init_path = [];
var init_obstacles = Array.from({ length: N_COLS }, () =>
  Array.from({ length: N_ROWS }, () => false)
);

const INITIAL_STATE = {
  target: { x: END_X, y: END_Y },
  isRunning: false,
  searchDone: false,
  foundTarget: false,
  searchAlgorithm: "BFS",
  cells: [{ x: START_X, y: START_Y, from: "START" }],
  path: init_path.map(cell => cell),
  isAddingObstacles: false,
  obstacles: init_obstacles.map(row => [...row]),
  visited: init_visited.map(row => [...row])
};

const runButtonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case runButtonTypes.RUN_GAME:
      //const [neighbors, foundTarget] = BFS(state);
      const [neighbors, foundTarget] = runSearchAlgorithm(state);
      const currentCells = state.cells.concat(neighbors);
      const { target } = state;

      var toBeReturned = {
        ...state,
        isRunning: true,
        searchDone: false,
        foundTarget: false,
        isAddingObstacles: false,
        searchAlgorithm: state.searchAlgorithm,
        path: state.path,
        cells: currentCells,
        visited: state.visited.map(row => [...row])
      };

      if (neighbors.length === 0 || foundTarget) {
        toBeReturned.searchDone = true;
        if (foundTarget) {
          toBeReturned.foundTarget = true;
          var currentPath = generatePath(currentCells, target);
          toBeReturned.path = state.path.concat(currentPath);
        }
      }
      return toBeReturned;

    case runButtonTypes.STOP_GAME:
      return {
        ...state,
        isRunning: false
      };
    case runButtonTypes.CLEAR_GAME:
      return {
        ...state,
        isRunning: false,
        searchDone: false,
        cells: [{ x: START_X, y: START_Y }],
        path: init_path.map(cell => cell),
        visited: init_visited.map(row => [...row])
      };
    case runButtonTypes.DRAG_TARGET:
      var newx = action.payload.x;
      var newy = action.payload.y;
      if (newx < 0) newx = 0;
      if (newx >= N_COLS) newx = N_COLS - 1;
      if (newy < 0) newy = 0;
      if (newy >= N_ROWS) newy = N_ROWS - 1;
      return {
        ...state,
        target: { x: newx, y: newy }
      };
    case runButtonTypes.ADD_OBSTACLE:
      var newx = action.payload.x;
      var newy = action.payload.y;
      if (newx >= 0 && newx < N_COLS && newy >= 0 && newy <= N_ROWS) {
        const existing = state.obstacles[newy][newx];
        if (!existing) {
          state.obstacles[newy][newx] = true;
          return {
            ...state,
            obstacles: state.obstacles.map(row => [...row])
          };
        }
        return state;
      }
    case runButtonTypes.TOGGLE_ADD_OBSTACLE:
      return {
        ...state,
        isAddingObstacles: !state.isAddingObstacles
      };
    case runButtonTypes.CLEAR_OBSTACLES:
      return {
        ...state,
        obstacles: init_obstacles.map(row => [...row])
      };
    case runButtonTypes.SELECT_SEARCH_ALGORITHM:
      return {
        ...state,
        searchAlgorithm: action.payload
      };
    default:
      return state;
  }
};

export default runButtonReducer;
