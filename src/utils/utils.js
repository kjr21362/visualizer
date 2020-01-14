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
    case "Dijkstra":
      return DijkstraSearch(state);
    default:
      return [[], false];
  }
};

export const runSortAlgorithm = state => {
  switch (state.sortAlgorithm) {
    case "Bubblesort":
      return bubbleSort(state);
    case "Quicksort":
      return quickSort(state);
    case "Mergesort":
      return mergeSort(state);
    case "Insertionsort":
      return insertionSort(state);
    default:
      return [state.originalArray, state.originalArray.length];
  }
};

const insertionSort = state => {
  if (state.insertionSort_savedState.length == 0) {
    return [state.originalArray, state.originalArray.length];
  }
  var savedState = state.insertionSort_savedState.shift();
  var saved_i = savedState[0];
  var saved_j = savedState[1];
  var array = state.originalArray;

  if (saved_j > 0 && array[saved_j - 1] > array[saved_j]) {
    var tmp = array[saved_j - 1];
    array[saved_j - 1] = array[saved_j];
    array[saved_j] = tmp;
    state.insertionSort_savedState.unshift([saved_i, saved_j - 1]);
  } else if (saved_i + 1 < state.originalArray.length) {
    state.insertionSort_savedState.unshift([saved_i + 1, saved_i + 1]);
  }
  return [array, 0];
};

const mergeSort = state => {
  if (state.mergeSort_savedState.length == 0) {
    return [state.originalArray, state.originalArray.length];
  }
  var lo = 0;
  var hi = state.originalArray.length - 1;

  var array = state.originalArray;
  var savedState = state.mergeSort_savedState.shift();
  var saved_m = savedState[0];
  var saved_i = savedState[1];

  var from = saved_i;
  var mid = saved_i + saved_m - 1;
  var to = Math.min(saved_i + 2 * saved_m - 1, hi);
  var newArray = merge(array, from, mid, to);

  for (var i = from; i <= to; i++) {
    array[i] = newArray[i - from];
  }

  if (saved_i + 2 * saved_m < hi) {
    state.mergeSort_savedState.unshift([saved_m, saved_i + 2 * saved_m]);
  } else if (2 * saved_m <= hi - lo) {
    state.mergeSort_savedState.unshift([2 * saved_m, lo]);
  }

  return [array, 0];
};

const merge = (array, low, mid, high) => {
  var newArray = new Array(high - low + 1);
  var i = low;
  var j = mid + 1;
  var k = 0;

  while (i <= mid && j <= high) {
    if (array[i] <= array[j]) {
      newArray[k] = array[i];
      i++;
      k++;
    } else {
      newArray[k] = array[j];
      j++;
      k++;
    }
  }
  while (i <= mid) {
    newArray[k] = array[i];
    i++;
    k++;
  }
  while (j <= high) {
    newArray[k] = array[j];
    j++;
    k++;
  }

  return newArray;
};

const quickSort = state => {
  if (state.quickSortIndexes.length == 0) {
    return [state.originalArray, state.originalArray.length];
  }
  const idxes = state.quickSortIndexes.shift();
  var low = idxes[0];
  var high = idxes[1];
  var saved_pIdx = idxes[2];
  var savedPivot = state.originalArray[saved_pIdx];
  var saved_i = idxes[3];
  var saved_j = idxes[4];

  if (low >= high) {
    return [state.originalArray, 0];
  }

  var array = state.originalArray;
  //const p = partition(state.originalArray, low, high);
  if (saved_j < high) {
    if (array[saved_j] < savedPivot) {
      const tmp = array[saved_j];
      array[saved_j] = array[saved_i];
      array[saved_i] = tmp;
      saved_i++;
    }
  }
  saved_j++;

  state.quickSort_pivotCol = saved_pIdx;
  state.quickSort_lowCol = saved_i;
  state.quickSort_movingCol = saved_j;

  if (saved_j >= high) {
    const tmp = array[high];
    array[high] = array[saved_i];
    array[saved_i] = tmp;

    state.quickSortIndexes.unshift([
      saved_i + 1,
      high,
      high,
      saved_i + 1,
      saved_i + 1
    ]);
    state.quickSortIndexes.unshift([low, saved_i - 1, saved_i - 1, low, low]);
  } else {
    state.quickSortIndexes.unshift([low, high, saved_pIdx, saved_i, saved_j]);
  }

  //state.quickSortIndexes.unshift([p + 1, high]);
  //state.quickSortIndexes.unshift([low, p - 1]);
  return [state.originalArray, 0];
};

const partition = (array, lo, hi) => {
  const pivot = array[hi];
  var i = lo;
  for (var j = lo; j <= hi; j++) {
    if (array[j] < pivot) {
      const tmp = array[j];
      array[j] = array[i];
      array[i] = tmp;
      i++;
    }
  }
  const tmp = array[hi];
  array[hi] = array[i];
  array[i] = tmp;
  return i;
};

const bubbleSort = state => {
  var array = state.originalArray;
  var idx = state.sortIndex;
  if (idx >= array.length) {
    return [array, idx];
  }
  var maxIndex = idx;
  var maxValue = array[maxIndex];
  for (var i = idx; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
      maxIndex = i;
    }
  }
  var temp = array[idx];
  array[idx] = maxValue;
  array[maxIndex] = temp;

  return [array, idx + 1];
};

export const dist = (x, y, target = { x: END_X, y: END_Y }) => {
  return Math.abs(x - target.x) + Math.abs(y - target.y);
};

export const cost = (x, y, target = { x: END_X, y: END_Y }) => {
  return Math.sqrt(
    (x - target.x) * (x - target.x) + (y - target.y) * (y - target.y)
  );
};

export const DijkstraSearch = state => {
  var neighbors = [];

  const offsets = [
    { x: 0, y: 1, from: "UP" },
    { x: 1, y: 0, from: "LEFT" },
    { x: 0, y: -1, from: "DOWN" },
    { x: -1, y: 0, from: "RIGHT" }
  ];
  const { cells, visited, target, obstacles, dijkstra_dist } = state;

  cells.sort((cell1, cell2) =>
    dijkstra_dist[cell1.y][cell1.x] > dijkstra_dist[cell2.y][cell2.x] ? 1 : -1
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
          const new_dist = dijkstra_dist[cell.y][cell.x] + 1;
          if (new_dist < dijkstra_dist[ny][nx]) {
            dijkstra_dist[ny][nx] = new_dist;
            neighbors.push({ x: nx, y: ny, from: direc });
            if (nx === target.x && ny === target.y) return [neighbors, true];
            return [neighbors, false];
          }
        }
      }
    }
  }
  return [neighbors, false];
};

export const AStarSearch = state => {
  const offsets = [
    { x: 0, y: 1, from: "UP" },
    { x: 1, y: 0, from: "LEFT" },
    { x: 0, y: -1, from: "DOWN" },
    { x: -1, y: 0, from: "RIGHT" }
  ];

  const {
    target,
    obstacles,
    openSet,
    closedSet,
    gScore,
    fScore,
    cameFrom
  } = state;

  if (openSet.length > 0) {
    openSet.sort((cell1, cell2) =>
      fScore[cell1.y][cell1.x] > fScore[cell2.y][cell2.x] ? 1 : -1
    );
    var current = openSet[0];
    if (current.x === target.x && current.y === target.y) {
      const path = generateAStarpath(cameFrom, current);
      return [openSet, closedSet, true, path];
    }

    openSet.shift();
    closedSet.push(current);

    for (var j = 0; j < offsets.length; j++) {
      var offset = offsets[j];
      var nx = offset.x + current.x;
      var ny = offset.y + current.y;
      var direc = offset.from;
      if (
        nx >= 0 &&
        ny >= 0 &&
        ny < N_VERTICAL_CELLS &&
        nx < N_HORIZONTAL_CELLS
      ) {
        const existing = closedSet.find(cell => cell.x === nx && cell.y === ny);
        if (existing !== undefined || obstacles[ny][nx]) continue;
        const tmp_gScore = gScore[current.y][current.x] + 1;
        const existInOpen = openSet.find(
          cell => cell.x === nx && cell.y === ny
        );
        if (existInOpen === undefined)
          openSet.push({ x: nx, y: ny, from: direc });
        if (tmp_gScore < gScore[ny][nx]) {
          //cameFrom[{ x: nx, y: ny }] = direc;
          //cameFrom.set({ x: nx, y: ny }, direc);
          cameFrom[ny][nx] = direc;
          gScore[ny][nx] = tmp_gScore;
          fScore[ny][nx] =
            gScore[ny][nx] +
            dist(nx, ny, {
              x: target.x,
              y: target.y
            });
        }
        if (nx === target.x && ny === target.y) {
          const path = generateAStarpath(cameFrom, target);
          return [openSet, closedSet, true, path];
        }
      }
    }
  }
  return [openSet, closedSet, false, []];
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

export const generateAStarpath = (cameFrom, target) => {
  var path = [];
  var current = { x: target.x, y: target.y };
  while (current.x !== START_X || current.y !== START_Y) {
    path.push({ x: current.x, y: current.y });
    switch (cameFrom[current.y][current.x]) {
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
  }
  path.push({ x: START_X, y: START_Y, from: "START" });
  return path;
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

export const generateMaze = state => {
  // https://github.com/professor-l/mazes/blob/master/scripts/prims.js
  var width = N_VERTICAL_CELLS;
  var height = N_HORIZONTAL_CELLS;
  var obstacles = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => true)
  );
  var start = [];
  do {
    start[0] = Math.floor(Math.random() * width);
  } while (start[0] % 2 == 0);
  do {
    start[1] = Math.floor(Math.random() * height);
  } while (start[1] % 2 == 0);
  obstacles[START_Y][START_X] = false;
  var openCells = [start];

  while (openCells.length) {
    var index = Math.floor(Math.random() * openCells.length);
    var cell = openCells[index];
    var nei = getNeighbors(obstacles, cell[0], cell[1]);

    while (nei.length == 0) {
      openCells.splice(index, 1);
      if (openCells.length == 0) break;
      index = Math.floor(Math.random() * openCells.length);
      cell = openCells[index];
      nei = getNeighbors(obstacles, cell[0], cell[1]);
    }
    if (openCells.length == 0) break;

    var choice = nei[Math.floor(Math.random() * nei.length)];
    openCells.push(choice);
    if (nei.length == 1) openCells.splice(index, 1);

    obstacles[choice[0]][choice[1]] = false;
    obstacles[(choice[0] + cell[0]) / 2][(choice[1] + cell[1]) / 2] = false;
  }
  obstacles[state.target.y][state.target.x] = false;
  return obstacles;
};

const getNeighbors = (maze, ic, jc) => {
  var res = [];
  for (var i = 0; i < 4; i++) {
    var nei = [ic, jc];
    nei[i % 2] += Math.floor(i / 2) * 2 || -2;
    if (
      nei[0] < maze.length &&
      nei[1] < maze[0].length &&
      nei[0] >= 0 &&
      nei[1] >= 0
    ) {
      if (maze[nei[0]][nei[1]] == true) res.push(nei);
    }
  }
  return res;
};

export const arrayToCells = array => {
  var cells = [];
  //var array = state.originalArray;
  for (var x = 0; x < array.length; x++) {
    for (var y = 0; y <= array[x]; y++) {
      cells.push({ x: x, y: y });
    }
  }
  return cells;
};
