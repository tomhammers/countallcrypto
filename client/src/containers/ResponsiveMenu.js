import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Responsive } from 'semantic-ui-react';
import download from 'downloadjs';
// actions
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
import { toggleChartType } from '../actions/chartTypeActions';
import { toggleCoinView } from '../actions/coinViewActions';
// components
import ImportEthereumAddressModal from '../components/ImportEthereumAddressModal';
import UploadFileModal from '../components/UploadFileModal';

import portfolioApi from '../api/portfolioApi';
import { chartTypeOptions, coinViewOptions, supportedFiatCurrencies } from '../common/constants';

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
    console.log('here');
    if (this.props.chartShown) {
      this.props.toggleChartShown(false);
    } else {
      this.props.toggleChartShown(true);
    }
  };

  render() {
    const {
      balancesShown,
      chartShown,
      chartType,
      coinView,
      newPortfolio,
      portfolio,
      updatePortfolioFiatCurrency,
      toggleChartType,
      toggleCoinView,
      toggleShowEtheremAddressModal,
    } = this.props;

    const toggleBalancesText = () => {
      if (balancesShown) {
        return 'Hide Balances';
      }
      return 'Show Balances';
    };

    const toggleChartTypeText = () => {
      if (chartType === chartTypeOptions.PieChart) {
        return 'Swith to Bar Chart';
      }
      return 'Swith to Pie Chart';
    }

    const toggleShowChartText = () => {
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
      <div>
        <Responsive>
          <Menu secondary stackable>
            <Dropdown item text="Menu">
              <Dropdown.Menu>
                <Dropdown.Item text="New Portfolio" onClick={newPortfolio} />
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
                  onClick={() => toggleShowEtheremAddressModal(true)}
                />
                {!portfolio._id ? (
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
                  onClick={this.toggleShowBalances}
                />
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
                <Dropdown.Divider />
                <Dropdown.Item
                  text={toggleShowChartText()}
                  onClick={this.toggleShowChart}
                />
                <Dropdown.Item
                  text={toggleChartTypeText()}
                  onClick={() =>
                    toggleChartType(
                      chartType === chartTypeOptions.PieChart
                        ? chartTypeOptions.BarChart
                        : chartTypeOptions.PieChart,
                    )
                  }
                />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Information">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/faq">FAQ</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position="right">
              <Dropdown
                item
                onChange={(event, { value }) =>
                  updatePortfolioFiatCurrency(value)
                }
                options={supportedFiatCurrencies}
                value={portfolio.fiatCurrency.value}
              />
            </Menu.Menu>
          </Menu>
        </Responsive>

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
    chartType: state.chartType,
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
      toggleChartType,
      toggleCoinView,
      toggleShowEtheremAddressModal: toggleShowModal,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
