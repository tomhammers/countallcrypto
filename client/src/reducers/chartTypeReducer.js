import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chartTypeReducer(state = initialState.chartType, action) {
  switch (action.type) {
    case types.TOGGLE_CHART_TYPE_SHOWN:
      return action.payload;
    default:
      return state;
  }
}