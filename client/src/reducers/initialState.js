import {
  accentColours,
  chartTypeOptions,
  coinViewOptions,
  sortByOptionsStrings,
  supportedFiatCurrencies,
} from '../common/constants';

export default {
  accentColour: accentColours[11].value,
  balancesShown: true,
  chartShown: true,
  chartType: chartTypeOptions.PieChart,
  coins: null,
  coinView: coinViewOptions.coinCards,
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
