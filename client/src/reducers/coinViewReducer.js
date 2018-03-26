import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function coinViewReducer(state = initialState.coinView, action) {
  switch (action.type) {
    case types.TOGGLE_COIN_VIEW:
      return action.payload;
    default:
      return state;
  }
}
