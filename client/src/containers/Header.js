import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Dropdown } from 'semantic-ui-react';

import Menu from './Menu';

import { supportedFiatCurrencies } from '../common/constants';
import {
  changePortfolioFiatCurrency,
  getPortfolioCoinPrices,
} from '../actions/portfolioActions';

class Header extends Component {
  state = {
    ellipsisDirection: 'ellipsis horizontal',
    selectedCurrency: this.props.portfolio.fiatCurrency,
  };

  onMouseOverMenu = () => {
    console.log('object');
    this.setState({ ellipsisDirection: 'ellipsis vertical' });
  };

  updatePortfolioFiatCurrency(newFiatCurrency) {
    this.props.changePortfolioFiatCurrency(
      newFiatCurrency,
      this.props.portfolio,
    );
  }

  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Menu />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Dropdown
              selection
              onChange={(event, { value }) =>
                this.updatePortfolioFiatCurrency(value)
              }
              options={supportedFiatCurrencies}
              value={this.props.portfolio.fiatCurrency.value}
              style={{ minWidth: '5em', align: 'right' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
