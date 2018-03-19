import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function showImportEthereumAddressModalReducer(
  state = initialState.showImportEthereumAddressModal,
  action,
) {
  switch (action.type) {
    case types.ADD_MULTIPLE_COINS_TO_PORTFOLIO:
      return false;
    case types.SHOW_IMPORT_ETHEREUM_ADDRESS_MODAL:
      return action.payload;
    default:
      return state;
  }
}
