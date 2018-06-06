import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Icon, Divider, Menu, Sidebar } from 'semantic-ui-react';
import download from 'downloadjs';
import '../styles/SidebarMenu.css';
// actions
import {
  addPortfolioId,
  getPortfolioCoinPrices,
  importEthereumAddressBalances,
  importPortfolio,
  newPortfolio,
} from '../actions/portfolioActions';
import { updateAccentColour } from '../actions/accentColourActions';
import { toggleShowModal } from '../actions/showImportEthereumAddressActions';
import { toggleBalancesShown } from '../actions/balancesShownActions';
import { toggleChartShown } from '../actions/chartShownAction';
import { toggleChartType } from '../actions/chartTypeActions';
import { toggleCoinView } from '../actions/coinViewActions';
// components
import DisplaySettingsModal from '../components/DisplaySettingsModal';
import ImportEthereumAddressModal from '../components/ImportEthereumAddressModal';
import UploadFileModal from '../components/UploadFileModal';

import portfolioApi from '../api/portfolioApi';

class MenuBar extends Component {
  state = { showDisplaySettingsModal: false, showUploadFileModal: false };

  exportPortfolio = () => {
    download(
      JSON.stringify(this.props.portfolio),
      'portfolio.json',
      'text/plain',
    );
    this.props.closeMenu();
  };

  newPortfolio = () => {
    this.props.newPortfolio();
    this.props.closeMenu();
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

  openDisplaySettingsModal = () => {
    this.setState({ showDisplaySettingsModal: true });
    this.props.closeMenu();
  };

  savePortfolioOnServer = async () => {
    const response = await portfolioApi.addPortfolio(this.props.portfolio);
    this.props.addPortfolioId(response.portfolioId);
    window.location.hash = response.portfolioId;
    this.props.closeMenu();
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

  onImportEthAddressClick = () => {
    this.props.toggleShowEtheremAddressModal(true);
    this.props.closeMenu();
  };

  onUploadFileMenuClick = () => {
    this.setState({ showUploadFileModal: true });
    this.props.closeMenu();
  };

  render() {
    const {
      accentColour,
      balancesShown,
      chartShown,
      chartType,
      coinView,
      toggleChartType,
      toggleCoinView,
      updateAccentColour,
    } = this.props;

    return (
      <div>
        <Sidebar
          width="wide"
          as={Menu}
          animation="push"
          visible={this.props.visible}
          inverted
          vertical
        >
          <Menu.Item
            content={
              <span>
                <Icon name="plus" /> New Portfolio
              </span>
            }
            name="newPortfolio"
            onClick={this.newPortfolio}
          />
          <Menu.Item
            content={
              <span>
                <Icon name="folder open" /> Import Portfolio
              </span>
            }
            name="importPortfolio"
            onClick={this.onUploadFileMenuClick}
          />
          <Menu.Item
            content={
              <span>
                <Icon name="download" /> Export Portfolio
              </span>
            }
            name="exportPortfolio"
            onClick={this.exportPortfolio}
          />
          <Menu.Item
            content={
              <span>
                <Icon name="plus square" /> Import Ethereum Address
              </span>
            }
            name="importEthereumAddress"
            onClick={this.onImportEthAddressClick}
          />
          <Divider />
          <Menu.Item
            content={
              <span>
                <Icon name="cloud" /> Get a unique URL
              </span>
            }
            name="savePortfolioOnServer"
            onClick={this.savePortfolioOnServer}
          />
          <Menu.Item
            content={
              <span>
                <Icon name="image" /> Display Settings
              </span>
            }
            name="displaySettings"
            onClick={this.openDisplaySettingsModal}
          />
        </Sidebar>
        <DisplaySettingsModal
          accentColour={accentColour}
          balancesShown={balancesShown}
          chartShown={chartShown}
          chartType={chartType}
          coinView={coinView}
          close={() => this.setState({ showDisplaySettingsModal: false })}
          open={this.state.showDisplaySettingsModal}
          toggleChartType={toggleChartType}
          toggleCoinView={toggleCoinView}
          toggleShowBalances={this.toggleShowBalances}
          toggleShowChart={this.toggleShowChart}
          updateAccentColour={updateAccentColour}
        />
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
    accentColour: state.accentColour,
    balancesShown: state.balancesShown,
    chartShown: state.chartShown,
    chartType: state.chartType,
    coinList: state.coinList,
    coinView: state.coinView,
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
      updateAccentColour,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar);
