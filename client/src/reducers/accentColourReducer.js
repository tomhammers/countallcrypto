import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accentColourReducer(state = initialState.accentColour, action) {
  switch (action.type) {
    case types.UPDATE_ACCENT_COLOUR:
      return action.payload;
    default:
      return state;
  }
}
