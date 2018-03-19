import { combineReducers } from 'redux';
import balancesShown from './balancesShownReducer';
import coinList from './coinListReducer';
import portfolio from './portfolioReducer';
import showImportEthereumAddressModal from './showImportEthereumAddressModalReducer';

export default combineReducers({
  balancesShown,
  coinList,
  portfolio,
  showImportEthereumAddressModal,
});
