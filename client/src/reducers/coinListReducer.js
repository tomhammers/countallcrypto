import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function coinsReducer(state = initialState.coins, action) {
  switch (action.type) {
    case types.COINLIST_RESPONSE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
