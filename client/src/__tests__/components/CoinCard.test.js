import React from 'react';
import { shallow } from 'enzyme';
import CoinCard from '../../components/CoinCard';

const portfolio = {
  fiatCurrency: {
    key: 'USD',
    value: 'USD',
    symbol: '$',
    text: 'USD',
  },
  sortBy: 'Portfolio %',
  coins: {
    BTC: {
      coinDetails: {},
      price: {
        USD: {},
      },
      quantity: 1.252,
    },
    ETH: {
      coinDetails: {},
      price: {
        USD: {},
      },
      quantity: 5.6115,
    },
  },
};

describe('CoinCard component', () => {
  it('renders without crashing', () => {
    const props = {
      balancesShown: true,
      id: 'BTC',
      portfolio: portfolio,
      coinBreakdown: {},
      onDeleteClick: () => {},
      onEditClick: () => {},
    };
    const component = shallow(<CoinCard {...props} />);
  });
});
