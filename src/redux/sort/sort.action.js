import sortTypes from "./sort.types";

export const toggleRunButton = () => ({
  type: sortTypes.RUN_SORT
});

export const toggleStopButton = () => ({
  type: sortTypes.STOP_SORT
});

export const toggleClearButton = () => ({
  type: sortTypes.CLEAR_SORT
});

export const selectSortAlgorithm = algorithm => ({
  type: sortTypes.SELECT_SORT_ALGORITHM,
  payload: algorithm
});
