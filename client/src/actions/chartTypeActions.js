import * as types from './actionTypes';

export function toggleChartType(chartType) {
  return {
    payload: chartType,
    type: types.TOGGLE_CHART_TYPE_SHOWN,
  };
}
