import { sortByOptionsStrings } from '../common/constants';

export const calculateGrandTotal = portfolio => {
  const { coins, fiatCurrency } = portfolio;
  let grandTotal = 0;

  Object.keys(coins).map(key => {
    return (grandTotal +=
      coins[key].quantity * coins[key].price[fiatCurrency.key].PRICE);
  });
  return grandTotal;
};

export const calculatePortfolioBreakdown = portfolio => {
  const { coins, fiatCurrency } = portfolio;
  const grandTotal = calculateGrandTotal(portfolio);
  let coinsTotals = [];

  // get total for each coin in portfolio
  Object.keys(coins)
    .filter(coin => coins.coinDetails === undefined)
    .map((key, index) => {
      let coinTotal =
        Math.round(
          coins[key].quantity * coins[key].price[fiatCurrency.key].PRICE * 100,
        ) / 100;
      coinsTotals[index] = {
        key: key,
        name: coins[key].coinDetails.CoinName,
        value: coinTotal,
        percOfPortfolio: Math.round(coinTotal / grandTotal * 100 * 100) / 100,
        changePercent24Hour: coins[key].price[fiatCurrency.key].CHANGEPCT24HOUR,
      };
      return coinsTotals;
    });
  return coinsTotals;
};

// with thanks to stackoverflow https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
export const sort_by = (field) => {
  let sortByField = '';
  let primer = () => {};
  let reverse = true;
  
  if (field === sortByOptionsStrings.PortfolioPerc) {
    sortByField = 'percOfPortfolio';
    primer = parseFloat;
    reverse = false;
  }
  if (field === sortByOptionsStrings.Name) {
    sortByField = 'name';
    primer = function(a){return a.toUpperCase()};
  }
  if (field === sortByOptionsStrings.DailyPerc) {
    sortByField = 'changePercent24Hour';
    primer = parseFloat;
    reverse = false;
  }

  const key = x => {
    return primer ? primer(x[sortByField]) : x[sortByField];
  };

  return (a, b) => {
    const A = key(a),
      B = key(b);
    return (A < B ? -1 : A > B ? 1 : 0) * [-1, 1][+!!reverse];
  };
};
