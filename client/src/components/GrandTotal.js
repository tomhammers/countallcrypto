import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import currencyFormatter from 'currency-formatter';

class GrandTotal extends Component {
  state = { secondsSinceLastUpdated: 0 };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        secondsSinceLastUpdated: this.state.secondsSinceLastUpdated + 1,
      });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.portfolioGrandTotal !== this.props.portfolioGrandTotal) {
      this.setState({ secondsSinceLastUpdated: 0 });
    }
  }

  render() {
    const { fiatCurrency, portfolioGrandTotal } = this.props;

    const timerText = () => {
      if (this.state.secondsSinceLastUpdated < 6) {
        return 'just now';
      } else {
        return `${this.state.secondsSinceLastUpdated} seconds ago`;
      }
    };

    return (
      <div style={{ height: '100%' }}>
        <Header sub>Portfolio Valuation</Header>
        <span style={{ fontSize: '46px' }}>
          {currencyFormatter.format(portfolioGrandTotal, {
            code: fiatCurrency,
          })}
        </span>
        <br />
        <br />
        <span style={{ position: 'absolute', bottom: '0', left: '40' }}>
          Last updated {timerText()}
        </span>
      </div>
    );
  }
}

GrandTotal.propTypes = {
  portfolioGrandTotal: PropTypes.number.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
};

export default GrandTotal;
