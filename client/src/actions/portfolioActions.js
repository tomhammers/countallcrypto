import cryptoCompareApi from '../api/cryptoCompareApi';
import ethplorerApi from '../api/ethplorerApi';
import * as types from './actionTypes';
import { supportedFiatCurrencies } from '../common/constants';

const getCoinsInPortfolio = coins => {
  let coinsInPortfolio = [];

  for (const [key] of Object.entries(coins)) {
    let coinName = key;
    coinsInPortfolio.push(coinName);
  }
  return coinsInPortfolio;
};

export function addCoinToPortfolio(coin, portfolio, coinDetails) {
  return async function(dispatch) {
    try {
      const coinPrice = await cryptoCompareApi.priceFull(
        coin.name,
        portfolio.fiatCurrency.key,
      );
      dispatch(fetchCoinSuccess(coin, coinPrice, coinDetails));
    } catch (error) {
      console.log(error);
    }
  };
}

function fetchCoinSuccess(coin, coinPrice, coinDetails) {
  return {
    payload: [coin, coinPrice, coinDetails],
    type: types.ADD_COIN_TO_PORTFOLIO,
  };
}

export function changePortfolioFiatCurrency(newCurrency, portfolio) {
  return async function(dispatch, getState) {
    let newFiatCurrency;
    Object.keys(supportedFiatCurrencies).map(key => {
      if (supportedFiatCurrencies[key].key === newCurrency) {
        newFiatCurrency = supportedFiatCurrencies[key];
        return newFiatCurrency;
      }
      return null;
    });
    // need to fetch new coin prices based on the updated fiat currency
    const coinsInPortfolio = getCoinsInPortfolio(portfolio.coins);
    try {
      const coinPrices = await cryptoCompareApi.priceFull(
        coinsInPortfolio,
        newFiatCurrency.key,
      );
      dispatch(updatePortfolioFiatCurrency(newFiatCurrency, coinPrices));
    } catch (error) {
      // TODO if error fetching coin prices, update fiat currency and do a rough conversion
      console.log(error);
    }
  };
}

function updatePortfolioFiatCurrency(fiatCurrency, coinPrices) {
  return {
    payload: [fiatCurrency, coinPrices],
    type: types.UPDATE_PORTFOLIO_FIAT_CURRENCY,
  };
}

export function getPortfolioCoinPrices(portfolio) {
  const coinsInPortfolio = getCoinsInPortfolio(portfolio.coins);

  return async function(dispatch) {
    try {
      const coinPrices = await cryptoCompareApi.priceFull(
        coinsInPortfolio,
        portfolio.fiatCurrency.key,
      );
      dispatch(fetchMultipleCoinPricesSuccess(coinPrices));
    } catch (error) {
      // TODO if error fetching coin prices return existing state
      console.log(error);
    }
  };
}

function fetchMultipleCoinPricesSuccess(coinPrices) {
  return {
    payload: coinPrices,
    type: types.UPDATE_PORTFOLIO_COIN_PRICES,
  };
}

export function removeCoinFromPortfolio(coinId) {
  return {
    payload: coinId,
    type: types.REMOVE_COIN_FROM_PORTFOLIO,
  };
}

export function updatePortfolioCoinDetails(portfolio, coinList) {
  let coinsInPortfolio = [];

  for (const [key] of Object.entries(portfolio.coins)) {
    let coinName = key;
    coinsInPortfolio.push(coinName);
  }

  return {
    type: types.UPDATE_PORTFOLIO_COIN_DETAILS,
    payload: [coinsInPortfolio, coinList],
  };
}

export function updatePortfolioCoinQuantity(coinId, newQuantity) {
  return {
    type: types.UPDATE_PORTFOLIO_COIN_QUANTITY,
    payload: [coinId, newQuantity],
  };
}

export function importEthereumAddressBalances(
  ethereumAddress,
  selectedOption,
  portfolio,
  coinList,
) {
  return async function(dispatch) {
    try {
      // returns eth balances and erc20 tokens associated with eth address
      const addressInfo = await ethplorerApi.addressInfo(ethereumAddress);
      const ethereumBalance = {
        name: Object.keys(addressInfo)[1],
        quantity: addressInfo.ETH.balance,
      };
      // loop through tokens associated with address and build up array
      const tokens = addressInfo.tokens
        .filter(token => (token = token.tokenInfo.symbol.match(/([A-Za-z])/g)))
        .map(token => {
          return {
            name: token.tokenInfo.symbol,
            quantity: token.balance / Math.pow(10, token.tokenInfo.decimals),
          };
        });
      tokens.push(ethereumBalance);

      try {
        let coinNames = tokens.map(token => {
          return token.name;
        });
        // get the latest prices for all found tokens / eth
        const coinPrices = await cryptoCompareApi.priceFull(
          coinNames,
          portfolio.fiatCurrency.key,
        );
        dispatch(
          addMultipleCoinsToPortfolio(
            tokens,
            coinPrices,
            coinList,
            selectedOption,
          ),
        );
      } catch (error) {
        // TODO if error getting pricedata from crypto compare
      }
    } catch (error) {
      // TODO if error getting addressInfo from ethplorer
      console.log(error);
    }
  };
}

function addMultipleCoinsToPortfolio(
  coins,
  coinPrices,
  coinDetails,
  selectedOption,
) {
  return {
    payload: [coins, coinPrices, coinDetails, selectedOption],
    type: types.ADD_MULTIPLE_COINS_TO_PORTFOLIO,
  };
}

export function newPortfolio() {
  return {
    type: types.NEW_PORTFOLIO,
  };
}

export function importPortfolio(portfolio) {
  return {
    payload: portfolio,
    type: types.IMPORT_PORTFOLIO,
  };
}

export function updateSortByOption(sortByOption) {
  return {
    payload: sortByOption,
    type: types.UPDATE_SORT_BY_OPTION,
  };
}
