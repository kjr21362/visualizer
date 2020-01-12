import { START_TIMER, STOP_TIMER } from "redux-timer";
import searchTypes from "../search/search.types";
import sortTypes from "../sort/sort.types";
import constants from "../../utils/constants";

export const stopTimerForAction = (dispatch, actionType) => {
  switch (actionType) {
    case constants.SEARCH:
      dispatch({
        type: STOP_TIMER,
        payload: {
          name: "searchTimer"
        }
      });
      break;
    case constants.SORT:
      dispatch({
        type: STOP_TIMER,
        payload: {
          name: "sortTimer"
        }
      });
  }
};

export const startTimerForAction = (dispatch, actionType) => {
  switch (actionType) {
    case constants.SEARCH:
      dispatch({
        type: START_TIMER,
        payload: {
          name: "searchTimer",
          action: searchTypes.RUN_SEARCH,
          interval: 100
        }
      });
      break;
    case constants.SORT:
      dispatch({
        type: START_TIMER,
        payload: {
          name: "sortTimer",
          action: sortTypes.RUN_SORT,
          interval: 100
        }
      });
      break;
    default:
      break;
  }
};
