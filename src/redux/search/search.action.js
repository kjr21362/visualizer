import searchTypes from "./search.types";

export const toggleRunButton = () => ({
  type: searchTypes.RUN_SEARCH
});

export const toggleStopButton = () => ({
  type: searchTypes.STOP_SEARCH
});

export const toggleClearButton = () => ({
  type: searchTypes.CLEAR_SEARCH
});

export const dragTarget = newPos => ({
  type: searchTypes.DRAG_TARGET,
  payload: newPos
});

export const toggleAddintObstacleState = () => ({
  type: searchTypes.TOGGLE_ADD_OBSTACLE
});

export const addObstacle = newObstacle => ({
  type: searchTypes.ADD_OBSTACLE,
  payload: newObstacle
});

export const clearObstacles = () => ({
  type: searchTypes.CLEAR_OBSTACLES
});

export const selectSearchAlgorithm = algorithm => ({
  type: searchTypes.SELECT_SEARCH_ALGORITHM,
  payload: algorithm
});

export const selectMazeAlgorithm = algorithm => ({
  type: searchTypes.SELECT_MAZE_ALGORITHM,
  payload: algorithm
});

export const generateMaze = () => ({
  type: searchTypes.GENERATE_MAZE
});
