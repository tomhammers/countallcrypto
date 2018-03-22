import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {
  supportedFiatCurrencies,
  sortByOptionsStrings,
} from '../common/constants';

import portfolioApi from '../api/portfolioApi';

const portfolioReducer = (state = initialState.portfolio, action) => {
  const portfolio = JSON.parse(JSON.stringify(state));
  let coinPrices = {};
  switch (action.type) {
    case types.ADD_COIN_TO_PORTFOLIO:
      // coin: { name, quantity }
      const coin = action.payload[0];
      // example structure ~ ETH: GBP: { priceDetails }
      const coinPrice = action.payload[1];
      const coinDetails = action.payload[2];
      // maybe coin exists in portfolio already
      const isCoinInPortfolio = coin.name in portfolio.coins;
      // string to float
      const quantity = coin.quantity * 1;
      if (isCoinInPortfolio) {
        parseFloat((portfolio.coins[coin.name].quantity += quantity));
      } else {
        portfolio.coins[coin.name] = {
          quantity,
          price: coinPrice[coin.name],
          coinDetails,
        };
      }
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    case types.ADD_MULTIPLE_COINS_TO_PORTFOLIO:
      // coin: [{ name, quantity }, ...]
      const coins = action.payload[0];
      const coinsPrices = action.payload[1];
      const replaceCoinsInPortfolio = action.payload[3];

      coins.filter(coin => coin.name in coinsPrices).map(coin => {
        const isCoinInPortfolio = coin.name in portfolio.coins;
        const quantity = coin.quantity * 1;
        // Should we add coins to existing balance? Else replace coins
        if (isCoinInPortfolio && replaceCoinsInPortfolio === 'Add') {
          parseFloat((portfolio.coins[coin.name].quantity += quantity));
        } else {
          // only add coin if we have details for coin
          if (action.payload[2][coin.name] !== undefined) {
            portfolio.coins[coin.name] = {
              quantity,
              price: action.payload[1][coin.name],
              coinDetails: action.payload[2][coin.name],
            };
          }
        }
      });
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    case types.ADD_PORTFOLIO_ID:
      portfolio._id = action.payload;
      return portfolio;

    case types.IMPORT_PORTFOLIO:
      return action.payload;

    case types.NEW_PORTFOLIO:
      return {
        fiatCurrency: supportedFiatCurrencies[0],
        coins: {},
        sortBy: sortByOptionsStrings.PortfolioPerc,
      };

    case types.UPDATE_PORTFOLIO_FIAT_CURRENCY:
      coinPrices = action.payload[1];
      for (const [key, value] of Object.entries(coinPrices)) {
        portfolio.coins[key].price = value;
      }
      portfolio.fiatCurrency = action.payload[0];
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    case types.REMOVE_COIN_FROM_PORTFOLIO:
      delete portfolio.coins[action.payload];
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    case types.UPDATE_PORTFOLIO_COIN_DETAILS:
      const coinsInPortfolio = action.payload[0];
      // full coin list given by crypto compare
      const coinList = action.payload[1];

      for (const coin of coinsInPortfolio) {
        // check for coins that crypto compare doesn't have coinDetails for
        if (coinList[coin] === undefined) {
          delete portfolio.coins[coin];
        } else {
          portfolio.coins[coin].coinDetails = coinList[coin];
        }
      }
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    case types.UPDATE_PORTFOLIO_COIN_PRICES:
      coinPrices = action.payload;
      for (const [key, value] of Object.entries(coinPrices)) {
        portfolio.coins[key].price = value;
      }
      return portfolio;

    case types.UPDATE_PORTFOLIO_COIN_QUANTITY:
      portfolio.coins[action.payload[0]].quantity = parseFloat(
        action.payload[1],
      );
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    case types.UPDATE_SORT_BY_OPTION:
      portfolio.sortBy = action.payload;
      if (portfolio._id) {
        portfolioApi.updatePortfolio(portfolio);
      }
      return portfolio;

    default:
      return state;
  }
};

export default portfolioReducer;
