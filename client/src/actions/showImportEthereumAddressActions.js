import * as types from './actionTypes';

export function toggleShowModal(show) {
  return {
    payload: show,
    type: types.SHOW_IMPORT_ETHEREUM_ADDRESS_MODAL,
  };
}
