import * as actions from '../../actions/balancesShownActions';
import * as types from '../../actions/actionTypes';

describe('show balance actions', () => {
  it('should toggle showBalances to false', () => {
    const isBalanceShown = false;
    const expectedAction = {
      type: types.TOGGLE_BALANCES_SHOWN,
      payload: isBalanceShown,
    };
    expect(actions.toggleBalancesShown(isBalanceShown)).toEqual(expectedAction);
  });

  it('should toggle showBalances to true', () => {
    const isBalanceShown = true;
    const expectedAction = {
      type: types.TOGGLE_BALANCES_SHOWN,
      payload: isBalanceShown,
    };
    expect(actions.toggleBalancesShown(isBalanceShown)).toEqual(expectedAction);
  });
});
