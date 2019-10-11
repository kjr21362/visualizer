import constants from "../utils/constants";

const N_HORIZONTAL_CELLS = constants.N_HORIZONTAL_CELLS;
const N_VERTICAL_CELLS = constants.N_VERTICAL_CELLS;
const START_X = constants.START_X;
const START_Y = constants.START_Y;
const END_X = constants.END_X;
const END_Y = constants.END_Y;

export const runSearchAlgorithm = state => {
  switch (state.searchAlgorithm) {
    case "BFS":
      return BFS(state);
    case "DFS":
      return DFS(state);
    case "A*":
      return AStarSearch(state);
    default:
      return [[], false];
  }
};

export const dist = (x, y, target = { x: END_X, y: END_Y }) => {
  return (x - target.x) * (x - target.x) + (y - target.y) * (y - target.y);
};

export const AStarSearch = state => {
  var neighbors = [];

  const offsets = [
    { x: 0, y: 1, from: "UP" },
    { x: 1, y: 0, from: "LEFT" },
    { x: 0, y: -1, from: "DOWN" },
    { x: -1, y: 0, from: "RIGHT" }
  ];
  const { cells, visited, target, obstacles, fScore, gScore } = state;

  cells.sort((cell1, cell2) =>
    fScore[cell1.y][cell1.x] >= fScore[cell2.y][cell2.x] ? 1 : -1
  );
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (cell.x === target.x && cell.y === target.y) return [neighbors, true];
    visited[cell.y][cell.x] = true;

    for (var j = 0; j < offsets.length; j++) {
      var offset = offsets[j];
      var nx = offset.x + cell.x;
      var ny = offset.y + cell.y;
      var direc = offset.from;
      if (
        nx >= 0 &&
        ny >= 0 &&
        ny < N_VERTICAL_CELLS &&
        nx < N_HORIZONTAL_CELLS
      ) {
        if (!visited[ny][nx] && !obstacles[ny][nx]) {
          const tmp_gScore = gScore[cell.y][cell.x] + 1;
          if (tmp_gScore < gScore[ny][nx]) {
            neighbors.push({ x: nx, y: ny, from: direc });
            gScore[ny][nx] = tmp_gScore;
            fScore[ny][nx] = gScore[ny][nx] + dist(nx, ny, target);
            if (nx === target.x && ny === target.y) return [neighbors, true];
            return [neighbors, false];
          }
        }
      }
    }
  }
  return [neighbors, false];
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
      if (
        nx >= 0 &&
        ny >= 0 &&
        ny < N_VERTICAL_CELLS &&
        nx < N_HORIZONTAL_CELLS
      ) {
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
      if (
        nx >= 0 &&
        ny >= 0 &&
        ny < N_VERTICAL_CELLS &&
        nx < N_HORIZONTAL_CELLS
      ) {
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
