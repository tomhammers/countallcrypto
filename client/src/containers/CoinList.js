import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Message } from 'semantic-ui-react';

import AddCoin from '../containers/AddCoin';
import CoinCard from '../components/CoinCard';
import EditCoinQuantityModal from '../components/EditCoinQuantityModal';

import { getCoinList } from '../actions/coinListActions';
import {
  getPortfolioCoinPrices,
  removeCoinFromPortfolio,
  updatePortfolioCoinDetails,
  updatePortfolioCoinQuantity,
  updateSortByOption,
} from '../actions/portfolioActions';
import { toggleShowModal } from '../actions/showImportEthereumAddressActions';

import { calculatePortfolioBreakdown, sort_by } from '../common/utils';
import { sortByOptions } from '../common/constants';

class Main extends Component {
  state = {
    editCoinQuantityModalOpen: false,
    loadingCoinList: false,
    portfolioBreakdown: [],
    selectedCoinId: '',
    selectedCoinQuantity: 0,
    showAddCoinForm: false,
    sortByOption: this.props.portfolio.sortBy,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log('updating ...........');
      this.props.getPortfolioCoinPrices(this.props.portfolio);
    }, 10000);
  }

  async componentWillMount() {
    this.props.getPortfolioCoinPrices(this.props.portfolio);
    // no need to get new coinList on every page load
    if (this.props.coinList === null) {
      await this.props.getCoinList();
    }
    await this.props.updatePortfolioCoinDetails(
      this.props.portfolio,
      this.props.coinList,
    );
  }

  componentWillUpdate(nextProps) {
    if (nextProps.portfolio.coins !== this.props.portfolio.coins) {
      let portfolioBreakdown = calculatePortfolioBreakdown(nextProps.portfolio);
      portfolioBreakdown.sort(sort_by(this.state.sortByOption));
      this.setState({ portfolioBreakdown: portfolioBreakdown });
    }
  }

  onAddCoinClick = async () => {
    this.setState({
      loadingCoinList: true,
    });
    await this.props.getCoinList();
    this.setState({
      loadingCoinList: false,
      showAddCoinForm: true,
    });
  };

  onDeleteClick = coinId => {
    this.props.removeCoinFromPortfolio(coinId);
  };

  onEditClick = async coinId => {
    const selectedCoinQuantity = await this.props.portfolio.coins[coinId]
      .quantity;
    this.setState({
      selectedCoinId: coinId,
      selectedCoinQuantity: selectedCoinQuantity,
      editCoinQuantityModalOpen: true,
    });
  };

  onEditCoinQuantitySubmit = newCoinQuantity => {
    this.props.updatePortfolioCoinQuantity(
      this.state.selectedCoinId,
      newCoinQuantity,
    );
    this.setState({ editCoinQuantityModalOpen: false });
  };

  updateSortByOption = async value => {
    this.setState({ sortByOption: value });
    let portfolioBreakdown = await calculatePortfolioBreakdown(
      this.props.portfolio,
    );
    portfolioBreakdown.sort(sort_by(this.state.sortByOption));
    this.props.updateSortByOption(this.state.sortByOption);

    this.setState({ portfolioBreakdown: portfolioBreakdown });
  };

  renderCards() {
    const coinsInPortfolio = this.props.portfolio.coins;
    return this.state.portfolioBreakdown.map((coin, i) => {
      if (coinsInPortfolio[coin.key] !== undefined) {
        return (
          <CoinCard
            balancesShown={this.props.balancesShown}
            key={coin.key}
            id={coin.key}
            portfolio={this.props.portfolio}
            coinBreakdown={this.state.portfolioBreakdown[i]}
            onDeleteClick={this.onDeleteClick}
            onEditClick={this.onEditClick}
          />
        );
      }
      return null;
    });
  }

  render() {
    return (
      <div>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              {'Sort by '}
              <Dropdown
                floating
                inline
                onChange={(event, { value }) => this.updateSortByOption(value)}
                options={sortByOptions}
                value={this.state.sortByOption}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>{this.renderCards()}</Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {!this.state.showAddCoinForm ? (
                <Button
                  primary
                  loading={this.state.loadingCoinList}
                  onClick={this.onAddCoinClick}
                >
                  Add Coin
                </Button>
              ) : null}

              {this.state.showAddCoinForm ? (
                <div>
                  <Message info>
                    <Message.Content>
                      Search for an individual coin
                    </Message.Content>
                  </Message>
                  <AddCoin
                    onCoinSubmit={() => {
                      this.setState({ showAddCoinForm: false });
                    }}
                  />
                  <Message info style={{ marginTop: '45px' }}>
                    <Message.Content>
                      <p>
                        Or enter an Ethereum Address to automatically import
                        Ethereum and ERC20 token balances to your portfolio
                      </p>
                    </Message.Content>
                  </Message>
                  <Button
                    onClick={() =>
                      this.props.toggleShowEtheremAddressModal(true)
                    }
                    primary
                  >
                    Add Ethereum Address
                  </Button>
                </div>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <EditCoinQuantityModal
          close={() => this.setState({ editCoinQuantityModalOpen: false })}
          coinId={this.state.selectedCoinId}
          coinQuantity={this.state.selectedCoinQuantity}
          onEditCoinQuantitySubmit={this.onEditCoinQuantitySubmit}
          open={this.state.editCoinQuantityModalOpen}
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCoinList,
      getPortfolioCoinPrices,
      removeCoinFromPortfolio,
      toggleShowEtheremAddressModal: toggleShowModal,
      updatePortfolioCoinDetails,
      updatePortfolioCoinQuantity,
      updateSortByOption,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
