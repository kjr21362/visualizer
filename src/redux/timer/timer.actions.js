import { START_TIMER, STOP_TIMER } from "redux-timer";
import runButtonTypes from "../runButton/runButton.types";

export const stopTimer = () => ({
  type: STOP_TIMER,
  payload: {
    name: "timer"
  }
});

export const startTimer = () => ({
  type: START_TIMER,
  payload: {
    name: "timer",
    action: runButtonTypes.RUN_GAME,
    interval: 500
  }
});
