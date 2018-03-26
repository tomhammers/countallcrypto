import * as types from './actionTypes';

export function toggleChartShown(isBalancesShown) {
  return {
    payload: isBalancesShown,
    type: types.TOGGLE_CHART_SHOWN,
  };
}