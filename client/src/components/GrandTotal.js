import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import currencyFormatter from 'currency-formatter';

const GrandTotal = props => {
  const { fiatCurrency, portfolioGrandTotal } = props;
  return (
    <div>
      <Header sub>Portfolio Valuation</Header>
      <span style={{ fontSize: '46px' }}>
        {currencyFormatter.format(portfolioGrandTotal, {
          code: fiatCurrency,
        })}
      </span>
    </div>
  );
};

GrandTotal.propTypes = {
  portfolioGrandTotal: PropTypes.number.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
};

export default GrandTotal;
