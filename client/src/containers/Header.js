import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from './Menu';

import {
  changePortfolioFiatCurrency,
  getPortfolioCoinPrices,
} from '../actions/portfolioActions';

class Header extends Component {
  state = {
    selectedCurrency: this.props.portfolio.fiatCurrency,
  };

  updatePortfolioFiatCurrency(newFiatCurrency) {
    this.props.changePortfolioFiatCurrency(
      newFiatCurrency,
      this.props.portfolio,
    );
  }

  render() {
    return (
      <Menu
        updatePortfolioFiatCurrency={value =>
          this.updatePortfolioFiatCurrency(value)
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    portfolio: state.portfolio,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePortfolioFiatCurrency,
      getPortfolioCoinPrices,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
