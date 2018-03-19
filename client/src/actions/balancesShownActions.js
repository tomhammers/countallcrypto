import * as types from './actionTypes';

export function toggleBalancesShown(isBalancesShown) {
  return {
    payload: isBalancesShown,
    type: types.TOGGLE_BALANCES_SHOWN,
  };
}
