import api from '../api/cryptoCompareApi';
import * as types from './actionTypes';

export function getCoinList() {
  return function(dispatch) {
    return api
      .coinList()
      .then(response => {
        dispatch(onCoinListRetrievalSuccess(response.Data));
      })
      .catch(error => {
        dispatch(onCoinListRetrievalFailure());
      });
  };
}

function onCoinListRetrievalFailure() {
  return {
    type: types.COINLIST_RESPONSE_FAILURE
  }
}

function onCoinListRetrievalSuccess(coinList) {
  return {
    payload: coinList,
    type: types.COINLIST_RESPONSE_SUCCESS
  }
}
