import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import Layout from '../components/Layout';
import CoinList from '../containers/CoinList';
import CoinTotals from '../containers/CoinTotals';
import '../styles/App.css';

import { importPortfolio } from '../actions/portfolioActions';

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
    if (nextProps.balancesShown) {
      if (nextProps.portfolio !== this.props.portfolio) {
        const grandTotal = calculateGrandTotal(this.props.portfolio);
        document.title = currencyFormatter.format(grandTotal, {
          code: this.props.portfolio.fiatCurrency.key,
        });
      }
    } else {
      document.title = "Crypto Portfolio";
    }
  }

  render() {
    return (
      <Layout>
        <CoinTotals />
        <CoinList />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    balancesShown: state.balancesShown,
    portfolio: state.portfolio,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      importPortfolio,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
