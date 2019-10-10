import runButtonTypes from "./runButton.types";

export const toggleRunButton = () => ({
  type: runButtonTypes.RUN_GAME
});

export const toggleStopButton = () => ({
  type: runButtonTypes.STOP_GAME
});

export const toggleClearButton = () => ({
  type: runButtonTypes.CLEAR_GAME
});

export const dragTarget = newPos => ({
  type: runButtonTypes.DRAG_TARGET,
  payload: newPos
});

export const toggleAddintObstacleState = () => ({
  type: runButtonTypes.TOGGLE_ADD_OBSTACLE
});

export const addObstacle = newObstacle => ({
  type: runButtonTypes.ADD_OBSTACLE,
  payload: newObstacle
});

export const clearObstacles = () => ({
  type: runButtonTypes.CLEAR_OBSTACLES
});

export const selectSearchAlgorithm = algorithm => ({
  type: runButtonTypes.SELECT_SEARCH_ALGORITHM,
  payload: algorithm
});
