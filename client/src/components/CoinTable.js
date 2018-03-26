import React from 'react';
import { Grid, Icon, Image, Header, Table } from 'semantic-ui-react';
import currencyFormatter from 'currency-formatter';

const CoinTable = props => {
  const {
    balancesShown,
    coinsInPortfolio,
    fiatCurrency,
    onDeleteClick,
    onEditClick,
    portfolioBreakdown,
  } = props;
  console.log(coinsInPortfolio);
  console.log(portfolioBreakdown);

  const renderCurrency = (amount, fiatCurrency) => {
    const precision = parseFloat(amount) < 0.1 ? 4 : 2;
    return currencyFormatter.format(amount, { code: fiatCurrency, precision });
  };

  const coinPercentageColor = coinKey => {
    return coinsInPortfolio[coinKey].price[fiatCurrency.key].CHANGEPCT24HOUR < 0
      ? 'red'
      : 'green';
  };

  const renderRows = () => {
    return portfolioBreakdown.map((coin, i) => {
      if (coinsInPortfolio[coin.key] !== undefined) {
        return (
          <Table.Row key={coin.key}>
            <Table.Cell verticalAlign="middle">
              {' '}
              <Header as="h6" floated="left">
                <Image
                  src={`https://www.cryptocompare.com${
                    coinsInPortfolio[coin.key].coinDetails.ImageUrl
                  }`}
                  verticalAlign="middle"
                />
                <Header.Content>
                  {coinsInPortfolio[coin.key].coinDetails.CoinName}
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell verticalAlign="middle">
              {' '}
              {renderCurrency(
                coinsInPortfolio[coin.key].price[fiatCurrency.key].PRICE,
                fiatCurrency.key,
              )}
            </Table.Cell>
            {balancesShown ? (
              <Table.Cell verticalAlign="middle">
                {' '}
                {coinsInPortfolio[coin.key].quantity}{' '}
                {coinsInPortfolio[coin.key].coinDetails.Name}
                <a style={{ cursor: 'pointer' }}>
                  <Icon
                    name="edit"
                    onClick={() => onEditClick(coin.key)}
                    style={{ marginLeft: '12px', fontColor: 'blue' }}
                  />
                </a>
              </Table.Cell>
            ) : null}
            {balancesShown ? (
              <Table.Cell verticalAlign="middle">
                {renderCurrency(
                  coinsInPortfolio[coin.key].quantity *
                    coinsInPortfolio[coin.key].price[fiatCurrency.key].PRICE,
                  fiatCurrency.key,
                )}
              </Table.Cell>
            ) : null}
            <Table.Cell verticalAlign="middle">
              {' '}
              <span style={{ color: coinPercentageColor(coin.key) }}>
                {Math.round(
                  coinsInPortfolio[coin.key].price[fiatCurrency.key]
                    .CHANGEPCT24HOUR * 100,
                ) / 100}%
              </span>
            </Table.Cell>
            <Table.Cell verticalAlign="middle">
              {coin.percOfPortfolio}%
            </Table.Cell>
            <Table.Cell verticalAlign="middle">
              <Icon
                name="trash"
                onClick={() => onDeleteClick(coin.key)}
                style={{ cursor: 'pointer' }}
              />
            </Table.Cell>
          </Table.Row>
        );
      }
    });
  };

  return (
    <Grid.Column>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            {balancesShown ? (
              <Table.HeaderCell>Holdings</Table.HeaderCell>
            ) : null}
            {balancesShown ? (
              <Table.HeaderCell>Valuation</Table.HeaderCell>
            ) : null}
            <Table.HeaderCell>(24h)</Table.HeaderCell>
            <Table.HeaderCell>Portfolio Share</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderRows()}</Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default CoinTable;
