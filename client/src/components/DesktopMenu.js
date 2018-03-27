import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { coinViewOptions, supportedFiatCurrencies } from '../common/constants';

const DesktopMenu = props => {
  const {
    balancesShown,
    chartShown,
    coinView,
    exportPortfolio,
    fiatCurrencyValue,
    newPortfolio,
    portfolioId,
    showUploadFileModal,
    toggleCoinView,
    toggleShowBalances,
    toggleShowChart,
    toggleShowEtheremAddressModal,
    updatePortfolioFiatCurrency,
  } = props;

  const toggleBalancesText = () => {
    if (balancesShown) {
      return 'Hide Balances';
    }
    return 'Show Balances';
  };

  const toggleChartText = () => {
    if (chartShown) {
      return 'Hide Chart';
    }
    return 'Show Chart';
  };

  const toggleCoinViewText = () => {
    if (coinView === coinViewOptions.coinCards) {
      return 'Switch to Table View';
    }
    return 'Switch to Card View';
  };

  return (
    <Menu secondary stackable>
      <Dropdown item text="Menu">
        <Dropdown.Menu>
          <Dropdown.Item text="New Portfolio" onClick={newPortfolio} />
          <Dropdown.Item
            text="Import Portfolio"
            onClick={showUploadFileModal}
          />
          <Dropdown.Item text="Export Portfolio" onClick={exportPortfolio} />
          <Dropdown.Divider />
          <Dropdown.Item
            text="Import Ethereum Address"
            onClick={() => toggleShowEtheremAddressModal(true)}
          />
          {!portfolioId ? (
            <Dropdown.Item
              text="Get a unique URL"
              onClick={this.savePortfolioOnServer}
            />
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item text="Display Options" className="link item">
        <Dropdown.Menu>
          <Dropdown.Item
            text={toggleBalancesText()}
            onClick={toggleShowBalances}
          />
          <Dropdown.Item text={toggleChartText()} onClick={toggleShowChart} />
          <Dropdown.Divider />
          <Dropdown.Item
            text={toggleCoinViewText()}
            onClick={() =>
              toggleCoinView(
                coinView === coinViewOptions.coinCards
                  ? coinViewOptions.coinTable
                  : coinViewOptions.coinCards,
              )
            }
          />
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item text="Information">
        <Dropdown.Menu>
          <Dropdown.Item>ToDo</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position="right">
        <Dropdown
          item
          onChange={(event, { value }) => updatePortfolioFiatCurrency(value)}
          options={supportedFiatCurrencies}
          value={fiatCurrencyValue}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default DesktopMenu;
