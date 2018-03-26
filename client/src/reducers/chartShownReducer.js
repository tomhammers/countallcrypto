import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chartShownReducer(state = initialState.chartShown, action) {
  switch (action.type) {
    case types.TOGGLE_CHART_SHOWN:
      return action.payload;
    default:
      return state;
  }
}
