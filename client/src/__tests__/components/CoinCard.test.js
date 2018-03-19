import React from 'react';
import { shallow } from 'enzyme';
import initialState from '../../reducers/initialState';
import CoinCard from '../../components/CoinCard';

describe('CoinCard component', () => {
    it('renders without crashing', () => {
        const props = {
          balancesShown: true,
          id: 'BTC',
          portfolio: initialState.portfolio,
          coinBreakdown: {},
          onDeleteClick: () => {},
          onEditClick: () => {},
        };
        const component = shallow(<CoinCard {...props}/>);
    });
});