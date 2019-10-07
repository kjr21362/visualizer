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
