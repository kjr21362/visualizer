import runButtonTypes from "./runButton.types";

const N_ROWS = 25;
const N_COLS = 40;
const START_X = 4;
const START_Y = 10;
var visited = Array.from({ length: N_COLS }, () =>
  Array.from({ length: N_ROWS }, () => false)
);

const INITIAL_STATE = {
  isRunning: false,
  cells: [{ x: START_X, y: START_Y }],
  visited: visited
};

const addCellsToPath = cells => {
  var neighbors = [];
  const offsets = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 }
  ];
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    for (var j = 0; j < offsets.length; j++) {
      var offset = offsets[j];
      var nx = cell.x + offset.x;
      var ny = cell.y + offset.y;
      if (nx >= 0 && ny >= 0 && ny < N_ROWS && nx < N_COLS) {
        if (!visited[ny][nx]) {
          visited[ny][nx] = true;
          neighbors.push({ x: nx, y: ny });
        }
      }
    }
  }

  return neighbors;
};

const runButtonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case runButtonTypes.RUN_GAME:
      const neighbors = addCellsToPath(state.cells);
      return {
        ...state,
        isRunning: true,
        cells: state.cells.concat(neighbors),
        visited: visited.map(row => [...row])
      };

    case runButtonTypes.STOP_GAME:
      return {
        ...state,
        isRunning: false
      };
    default:
      return state;
  }
};

export default runButtonReducer;
