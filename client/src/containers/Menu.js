import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
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
import ImportEthereumAddressModal from '../components/ImportEthereumAddressModal';
import UploadFileModal from '../components/UploadFileModal';

import portfolioApi from '../api/portfolioApi';

class Menu extends Component {
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

  render() {
    const toggleBalancesText = () => {
      if (this.props.balancesShown) {
        return 'Hide Balances';
      }
      return 'Show Balances';
    };

    return (
      <div>
        <Dropdown button text="Settings">
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
            <Dropdown.Item
              text={toggleBalancesText()}
              onClick={this.toggleShowBalances}
            />
            {!this.props.portfolio._id ? (
              <Dropdown.Item
                text="Get a unique URL"
                onClick={this.savePortfolioOnServer}
              />
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
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
    coinList: state.coinList,
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
      toggleShowEtheremAddressModal: toggleShowModal,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
