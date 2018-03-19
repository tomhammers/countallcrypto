import { sortByOptionsStrings, supportedFiatCurrencies } from '../common/constants';

export default {
  balancesShown: true,
  coins: null,
  portfolio: {
    fiatCurrency: supportedFiatCurrencies[0],
    sortBy: sortByOptionsStrings.PortfolioPerc,
    coins: {
      BTC: {
        coinDetails: {},
        quantity: 1.252,
      },
      ETH: {
        coinDetails: {},
        quantity: 5.6115,
      },
    },
  },
  portfolioBreakdown: [],
  showImportEthereumAddressModal: false,
};
