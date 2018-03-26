import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Menu } from 'semantic-ui-react';
import download from 'downloadjs';

import {
  addPortfolioId,
  getPortfolioCoinPrices,
  importEthereumAddressBalances,
  importPortfolio,
  newPortfolio,
} from '../actions/portfolioActions';
import { toggleShowModal } from '../actions/showImportEthereumAddressActions';
import { toggleBalancesShown } from '../actions/balancesShownActions';
import { toggleChartShown } from '../actions/chartShownAction';
import { toggleCoinView } from '../actions/coinViewActions';
import ImportEthereumAddressModal from '../components/ImportEthereumAddressModal';
import UploadFileModal from '../components/UploadFileModal';

import portfolioApi from '../api/portfolioApi';

import { coinViewOptions, supportedFiatCurrencies } from '../common/constants';

class MenuBar extends Component {
  state = { showUploadFileModal: false };

  exportPortfolio = () => {
    download(
      JSON.stringify(this.props.portfolio),
      'portfolio.json',
      'text/plain',
    );
  };

  onEthereumAddressSubmit = (ethereumAddress, selectedOption) => {
    const { coinList, portfolio } = this.props;
    this.setState({ showImportEthereumAddressModal: false });
    this.props.importEthereumAddressBalances(
      ethereumAddress,
      selectedOption,
      portfolio,
      coinList,
    );
  };

  onImportPortfolioSubmit = async portfolio => {
    await this.props.importPortfolio(portfolio);
    this.props.getPortfolioCoinPrices(portfolio);
    this.setState({ showUploadFileModal: false });
  };

  savePortfolioOnServer = async () => {
    const response = await portfolioApi.addPortfolio(this.props.portfolio);
    this.props.addPortfolioId(response.portfolioId);
    window.location.hash = response.portfolioId;
  };

  toggleShowBalances = () => {
    if (this.props.balancesShown) {
      this.props.toggleBalancesShown(false);
    } else {
      this.props.toggleBalancesShown(true);
    }
  };

  toggleShowChart = () => {
    if (this.props.chartShown) {
      this.props.toggleChartShown(false);
    } else {
      this.props.toggleChartShown(true);
    }
  };

  render() {
    const toggleBalancesText = () => {
      if (this.props.balancesShown) {
        return 'Hide Balances';
      }
      return 'Show Balances';
    };

    const toggleChartText = () => {
      if (this.props.chartShown) {
        return 'Hide Chart';
      }
      return 'Show Chart';
    };

    const { updatePortfolioFiatCurrency } = this.props;

    return (
      <div>
        <Menu secondary>
          <Dropdown item text="Menu">
            <Dropdown.Menu>
              <Dropdown.Item
                text="New Portfolio"
                onClick={this.props.newPortfolio}
              />
              <Dropdown.Item
                text="Import Portfolio"
                onClick={() => this.setState({ showUploadFileModal: true })}
              />
              <Dropdown.Item
                text="Export Portfolio"
                onClick={this.exportPortfolio}
              />
              <Dropdown.Divider />
              <Dropdown.Item
                text="Import Ethereum Address"
                onClick={() => this.props.toggleShowEtheremAddressModal(true)}
              />
              {!this.props.portfolio._id ? (
                <Dropdown.Item
                  text="Get a unique URL"
                  onClick={this.savePortfolioOnServer}
                />
              ) : null}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item simple text="Display Options" className="link item">
            <Dropdown.Menu>
              <Dropdown.Item
                text={toggleBalancesText()}
                onClick={this.toggleShowBalances}
              />
              <Dropdown.Item
                text={toggleChartText()}
                onClick={this.toggleShowChart}
              />
              <Dropdown.Divider />
              <Dropdown.Item>
                <span className="text">Coin List View</span>
                <i className="triangle right icon" />
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      this.props.toggleCoinView(coinViewOptions.coinCards)
                    }
                  >
                    Cards
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      this.props.toggleCoinView(coinViewOptions.coinTable)
                    }
                  >
                    Table
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
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
              onChange={(event, { value }) =>
                updatePortfolioFiatCurrency(value)
              }
              options={supportedFiatCurrencies}
              value={this.props.portfolio.fiatCurrency.value}
            />
          </Menu.Menu>
        </Menu>

        <ImportEthereumAddressModal
          close={() => this.props.toggleShowEtheremAddressModal(false)}
          onSubmit={this.onEthereumAddressSubmit}
          open={this.props.showImportEthereumAddressModal}
        />
        <UploadFileModal
          close={() => this.setState({ showUploadFileModal: false })}
          onSubmit={this.onImportPortfolioSubmit}
          open={this.state.showUploadFileModal}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    balancesShown: state.balancesShown,
    chartShown: state.chartShown,
    coinList: state.coinList,
    coinView: state.coinView,
    portfolio: state.portfolio,
    showImportEthereumAddressModal: state.showImportEthereumAddressModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addPortfolioId,
      getPortfolioCoinPrices,
      importEthereumAddressBalances,
      importPortfolio,
      newPortfolio,
      toggleBalancesShown,
      toggleChartShown,
      toggleCoinView,
      toggleShowEtheremAddressModal: toggleShowModal,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
