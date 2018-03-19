import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import GrandTotal from '../components/GrandTotal';
import PortfolioChart from '../components/PortfolioChart';

import { calculateGrandTotal, calculatePortfolioBreakdown } from '../common/utils';

class CoinTotals extends Component {
  state = { grandTotal: 0, portfolioBreakdown: [] };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.portfolio.coins !== this.props.portfolio.coins) {
      await this.setState({ grandTotal: calculateGrandTotal(nextProps.portfolio) });
      this.setState({ portfolioBreakdown: calculatePortfolioBreakdown(nextProps.portfolio) });
    }
  }

  render() {
    const columnsCount = this.props.balancesShown ? 2 : 1;

    return (
      <Grid
        columns={columnsCount}
        stackable
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
      >
        <Grid.Row textAlign="center" verticalAlign="middle">
          {this.props.balancesShown ? (
            <Grid.Column>
              <GrandTotal
                portfolioGrandTotal={this.state.grandTotal}
                fiatCurrency={this.props.portfolio.fiatCurrency.key}
              />
            </Grid.Column>
          ) : null}
          <Grid.Column>
            <PortfolioChart
              portfolioBreakdown={this.state.portfolioBreakdown}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    balancesShown: state.balancesShown,
    portfolio: state.portfolio,
  };
}

export default connect(mapStateToProps, null)(CoinTotals);
