import constants from "../utils/constants";

const N_ROWS = constants.N_ROWS;
const N_COLS = constants.N_COLS;
const START_X = constants.START_X;
const START_Y = constants.START_Y;

export const runSearchAlgorithm = state => {
  switch (state.searchAlgorithm) {
    case "BFS":
      return BFS(state);
    case "DFS":
      return DFS(state);
    default:
      return [[], false];
  }
};

export const DFS = state => {
  var neighbors = [];

  const offsets = [
    { x: 0, y: 1, from: "UP" },
    { x: 1, y: 0, from: "LEFT" },
    { x: 0, y: -1, from: "DOWN" },
    { x: -1, y: 0, from: "RIGHT" }
  ];
  const { cells, visited, target, obstacles } = state;

  if (cells.length) {
    var cell = cells[cells.length - 1];
    if (cell.x === target.x && cell.y === target.y) return [neighbors, true];
    for (var j = 0; j < offsets.length; j++) {
      var offset = offsets[j];
      var nx = offset.x + cell.x;
      var ny = offset.y + cell.y;
      var direc = offset.from;
      if (nx >= 0 && ny >= 0 && ny < N_ROWS && nx < N_COLS) {
        if (!visited[ny][nx] && !obstacles[ny][nx]) {
          visited[ny][nx] = true;
          neighbors.push({ x: nx, y: ny, from: direc });
          if (nx === target.x && ny === target.y) return [neighbors, true];
          return [neighbors, false];
        }
      }
    }
  }
  return [neighbors, false];
};

export const BFS = state => {
  var neighbors = [];
  const offsets = [
    { x: 0, y: 1, from: "UP" },
    { x: 0, y: -1, from: "DOWN" },
    { x: 1, y: 0, from: "LEFT" },
    { x: -1, y: 0, from: "RIGHT" }
  ];
  const { cells, visited, target, obstacles } = state;
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (cell.x === target.x && cell.y === target.y) return [neighbors, true];

    for (var j = 0; j < offsets.length; j++) {
      var offset = offsets[j];
      var nx = cell.x + offset.x;
      var ny = cell.y + offset.y;
      var direc = offset.from;
      if (nx >= 0 && ny >= 0 && ny < N_ROWS && nx < N_COLS) {
        if (!visited[ny][nx] && !obstacles[ny][nx]) {
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

export const generatePath = (cells, target) => {
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

    const prevCell = cells.find(
      cell => cell.x === current.x && cell.y === current.y
    );
    if (prevCell) {
      current.from = prevCell.from;
    } else {
      break;
    }
  }
  path.push({ x: START_X, y: START_Y, from: "START" });
  return path;
};
