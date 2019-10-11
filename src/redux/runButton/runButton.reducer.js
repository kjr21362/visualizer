import runButtonTypes from "./runButton.types";
import { runSearchAlgorithm, generatePath, dist } from "../../utils/utils";
import constants from "../../utils/constants";

const N_HORIZONTAL_CELLS = constants.N_HORIZONTAL_CELLS;
const N_VERTICAL_CELLS = constants.N_VERTICAL_CELLS;
const START_X = constants.START_X;
const START_Y = constants.START_Y;
const END_X = constants.END_X;
const END_Y = constants.END_Y;
var init_visited = Array.from({ length: N_VERTICAL_CELLS }, () =>
  Array.from({ length: N_HORIZONTAL_CELLS }, () => false)
);

var init_path = [];
var init_obstacles = Array.from({ length: N_VERTICAL_CELLS }, () =>
  Array.from({ length: N_HORIZONTAL_CELLS }, () => false)
);

var init_gScore = Array.from({ length: N_VERTICAL_CELLS }, () =>
  Array.from({ length: N_HORIZONTAL_CELLS }, () => Number.POSITIVE_INFINITY)
);
init_gScore[START_Y][START_X] = 0;
var init_fScore = Array.from({ length: N_VERTICAL_CELLS }, () =>
  Array.from({ length: N_HORIZONTAL_CELLS }, () => Number.POSITIVE_INFINITY)
);
init_fScore[START_Y][START_X] = dist(START_X, START_Y);

const INITIAL_STATE = {
  target: { x: END_X, y: END_Y },
  isRunning: false,
  searchDone: false,
  foundTarget: false,
  searchAlgorithm: "BFS",
  cells: [
    {
      x: START_X,
      y: START_Y,
      from: "START"
    }
  ],
  fScore: init_fScore.map(row => [...row]),
  gScore: init_fScore.map(row => [...row]),
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
      const tmp_fScore = init_fScore.map(row => [...row]);
      tmp_fScore[START_Y][START_X] = dist(START_X, START_Y, state.target);
      return {
        ...state,
        isRunning: false,
        searchDone: false,
        cells: [
          {
            x: START_X,
            y: START_Y,
            from: "START"
          }
        ],
        fScore: tmp_fScore,
        gScore: init_fScore.map(row => [...row]),
        path: init_path.map(cell => cell),
        visited: init_visited.map(row => [...row])
      };
    case runButtonTypes.DRAG_TARGET:
      var newx = action.payload.x;
      var newy = action.payload.y;
      if (newx < 0) newx = 0;
      if (newx >= N_HORIZONTAL_CELLS) newx = N_HORIZONTAL_CELLS - 1;
      if (newy < 0) newy = 0;
      if (newy >= N_VERTICAL_CELLS) newy = N_VERTICAL_CELLS - 1;
      return {
        ...state,
        target: { x: newx, y: newy }
      };
    case runButtonTypes.ADD_OBSTACLE:
      var newx = action.payload.x;
      var newy = action.payload.y;
      if (
        newx >= 0 &&
        newx < N_HORIZONTAL_CELLS &&
        newy >= 0 &&
        newy < N_VERTICAL_CELLS
      ) {
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
