import { combineReducers } from 'redux';
import balancesShown from './balancesShownReducer';
import chartShown from './chartShownReducer';
import chartType from './chartTypeReducer';
import coinList from './coinListReducer';
import coinView from './coinViewReducer';
import portfolio from './portfolioReducer';
import showImportEthereumAddressModal from './showImportEthereumAddressModalReducer';

export default combineReducers({
  balancesShown,
  chartShown,
  chartType,
  coinList,
  coinView,
  portfolio,
  showImportEthereumAddressModal,
});
