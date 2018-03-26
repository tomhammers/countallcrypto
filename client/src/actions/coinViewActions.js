import * as types from './actionTypes';

export function toggleCoinView(coinViewOption) {
  return {
    payload: coinViewOption,
    type: types.TOGGLE_COIN_VIEW,
  };
}