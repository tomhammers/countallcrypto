import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Responsive } from 'semantic-ui-react';
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
import { toggleCoinView } from '../actions/coinViewActions';
// components
import DesktopMenu from '../components/DesktopMenu';
import ImportEthereumAddressModal from '../components/ImportEthereumAddressModal';
import UploadFileModal from '../components/UploadFileModal';

import portfolioApi from '../api/portfolioApi';

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
    const {
      balancesShown,
      chartShown,
      coinView,
      newPortfolio,
      portfolio,
      updatePortfolioFiatCurrency,
      toggleCoinView,
      toggleShowEtheremAddressModal,
    } = this.props;

    return (
      <div>
        <Responsive>
          <DesktopMenu
            balancesShown={balancesShown}
            chartShown={chartShown}
            coinView={coinView}
            exportPortfolio={this.exportPortfolio}
            fiatCurrencyValue={portfolio.fiatCurrency.value}
            newPortfolio={newPortfolio}
            portfolioId={portfolio._id}
            showUploadFileModal={() =>
              this.setState({ showUploadFileModal: true })
            }
            toggleCoinView={toggleCoinView}
            toggleShowBalances={this.toggleShowBalances}
            toggleShowChart={this.toggleShowChart}
            toggleShowEtheremAddressModal={toggleShowEtheremAddressModal}
            updatePortfolioFiatCurrency={updatePortfolioFiatCurrency}
          />
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
