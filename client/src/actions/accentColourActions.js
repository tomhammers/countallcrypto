import * as types from './actionTypes';

export function updateAccentColour(newColour) {
  return {
    payload: newColour,
    type: types.UPDATE_ACCENT_COLOUR,
  };
}
