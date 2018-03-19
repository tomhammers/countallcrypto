import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function balancesShownReducer(state = initialState.balancesShown, action) {
  switch (action.type) {
    case types.TOGGLE_BALANCES_SHOWN:
      return action.payload;
    default:
      return state;
  }
}
