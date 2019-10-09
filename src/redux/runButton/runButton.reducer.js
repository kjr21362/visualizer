import runButtonTypes from "./runButton.types";

const N_ROWS = 25;
const N_COLS = 40;
const START_X = 4;
const START_Y = 10;
const END_X = 24;
const END_Y = 17;
var init_visited = Array.from({ length: N_COLS }, () =>
  Array.from({ length: N_ROWS }, () => false)
);

var init_path = [];

const INITIAL_STATE = {
  target: { x: END_X, y: END_Y },
  isRunning: false,
  searchDone: false,
  foundTarget: false,
  cells: [{ x: START_X, y: START_Y, from: "START" }],
  path: init_path.map(cell => cell),
  visited: init_visited.map(row => [...row])
};

const addCellsToPath = state => {
  var neighbors = [];
  const offsets = [
    { x: 0, y: 1, from: "UP" },
    { x: 0, y: -1, from: "DOWN" },
    { x: 1, y: 0, from: "LEFT" },
    { x: -1, y: 0, from: "RIGHT" }
  ];
  const { cells, visited, target } = state;
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];

    for (var j = 0; j < offsets.length; j++) {
      var offset = offsets[j];
      var nx = cell.x + offset.x;
      var ny = cell.y + offset.y;
      var direc = offset.from;
      if (nx >= 0 && ny >= 0 && ny < N_ROWS && nx < N_COLS) {
        if (!visited[ny][nx]) {
          visited[ny][nx] = true;
          neighbors.push({ x: nx, y: ny, from: direc });
          if (nx === target.x && ny === target.y) {
            return [neighbors, true];
          }
        }
      }
    }
  }

  return [neighbors, false];
};

const generatePath = (cells, target) => {
  var current = { x: target.x, y: target.y, from: "END" };
  var path = [];
  while (current.x !== START_X || current.y !== START_Y) {
    path.push({ x: current.x, y: current.y, from: current.from });
    switch (current.from) {
      case "UP":
        current.y = current.y - 1;
        break;
      case "DOWN":
        current.y = current.y + 1;
        break;
      case "LEFT":
        current.x = current.x - 1;
        break;
      case "RIGHT":
        current.x = current.x + 1;
        break;
      default:
        break;
    }
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      if (cell.x === current.x && cell.y === current.y) {
        current.from = cell.from;
        break;
      }
    }
  }
  path.push({ x: START_X, y: START_Y, from: "START" });
  return path;
};

const runButtonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case runButtonTypes.RUN_GAME:
      const [neighbors, foundTarget] = addCellsToPath(state);
      const currentCells = state.cells.concat(neighbors);
      const { target } = state;

      var toBeReturned = {
        ...state,
        isRunning: true,
        searchDone: false,
        foundTarget: false,
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
    default:
      return state;
  }
};

export default runButtonReducer;
