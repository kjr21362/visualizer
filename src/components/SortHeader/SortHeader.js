import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./SortHeader.css";
import {
  startTimerForAction,
  stopTimerForAction
} from "../../redux/timer/timer.actions";
import {
  toggleStopButton,
  toggleClearButton,
  selectSortAlgorithm
} from "../../redux/sort/sort.action";
import constants from "../../utils/constants";

const sort_options = constants.SORT_OPTIONS;

class SortHeader extends React.Component {
  _onSelect(option) {
    //console.log(option.label);
    this.props.dispatch(selectSortAlgorithm(option.label));
  }
  render() {
    const { isRunning, dispatch, searchDone } = this.props;
    if (searchDone) {
      dispatchWhenStop(this.props);
    }
    return (
      <div className="ui secondary pointing menu">
        <Dropdown
          options={sort_options}
          value={sort_options[0]}
          onChange={option => {
            this.props.dispatch(selectSortAlgorithm(option.label));
          }}
        />

        <button
          className="ui primary button"
          onClick={() => {
            isRunning
              ? dispatchWhenStop(this.props)
              : startTimerForAction(this.props.dispatch, constants.SORT);
          }}
        >
          {isRunning ? "Stop!" : "Run!"}
        </button>
        <button
          className="ui primary button"
          onClick={() => {
            dispatchWhenClear(this.props);
          }}
        >
          Clear!
        </button>
      </div>
    );
  }
}

const dispatchWhenClear = props => {
  //props.dispatch(stopTimer());
  stopTimerForAction(props.dispatch, constants.SORT);
  props.dispatch(toggleClearButton());
};

const dispatchWhenStop = props => {
  //props.dispatch(stopTimer());
  stopTimerForAction(props.dispatch, constants.SORT);
  props.dispatch(toggleStopButton());
};

const mapStateToProps = state => ({
  isRunning: state.sortReducer.isRunning,
  searchDone: state.sortReducer.searchDone
});

export default connect(mapStateToProps)(SortHeader);
