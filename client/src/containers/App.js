import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import Layout from '../components/Layout';
import CoinList from '../containers/CoinList';
import CoinTotals from '../containers/CoinTotals';
import '../styles/App.css';

import {
  getPortfolioCoinPrices,
  importPortfolio,
} from '../actions/portfolioActions';

import portfolioApi from '../api/portfolioApi';
import { calculateGrandTotal } from '../common/utils';

class App extends Component {
  // get portfolio id from url OR from rehydrated state
  state = {
    portfolioId: window.location.hash.substr(1) || this.props.portfolio._id,
  };

  async componentWillMount() {
    if (this.state.portfolioId) {
      // if id exists, look for portfolio on server
      const result = await portfolioApi.getPortfolio(this.state.portfolioId);
      this.props.importPortfolio(result.portfolio);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      balancesShown,
      chartShown,
      getPortfolioCoinPrices,
      portfolio,
    } = this.props;
    // put portfolio total in document title
    if (nextProps.balancesShown) {
      if (nextProps.portfolio !== portfolio) {
        const grandTotal = calculateGrandTotal(portfolio);
        document.title = currencyFormatter.format(grandTotal, {
          code: portfolio.fiatCurrency.key,
        });
      }
    } else {
      document.title = 'Crypto Portfolio';
    }
    // when user shows balances / charts again, get current prices
    if (
      nextProps.balancesShown !== balancesShown ||
      nextProps.chartShown !== chartShown
    ) {
      getPortfolioCoinPrices(portfolio);
    }
  }

  render() {
    const { balancesShown, chartShown } = this.props;
    return (
      <Layout>
        {balancesShown || chartShown ? <CoinTotals /> : null}
        <CoinList />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    balancesShown: state.balancesShown,
    chartShown: state.chartShown,
    portfolio: state.portfolio,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPortfolioCoinPrices,
      importPortfolio,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
