import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Input, Message, Search } from 'semantic-ui-react';

import { addCoinToPortfolio } from '../actions/portfolioActions';

class AddCoin extends Component {
  state = {
    addCoinFormSearchError: false,
    addCoinFormQuantityError: false,
    coinOptions: [],
    coinQuantityValue: '',
    errorMessage: '',
    noResultsMessage: 'No results found',
    resultSelected: false,
    searchValue: '',
    selectedCoin: '',
    validAddCoinForm: false,
  };

  componentWillMount() {
    this.loadCoinOptions();
    this.resetSearchComponent();
  }

  checkAddCoinFormValidation() {
    if (!this.state.resultSelected) {
      this.setState({ errorMessage: 'Please select a search result' });
      return false;
    }
    return true;
  }

  handleResultSelect = (e, { result }) => {
    this.setState({
      errorMessage: '',
      resultSelected: true,
      selectedCoin: result.id,
      searchValue: result.title,
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({
      errorMessage: '',
      isLoading: true,
      resultSelected: false,
      searchValue: value,
    });
    const { coinOptions } = this.state;

    setTimeout(() => {
      if (value.length === 1) {
        this.setState({ noResultsMessage: 'Type 2 or more letters' });
      }
      if (value.length < 2) return this.resetSearchComponent();
      if (value.length > 1) {
        const re = new RegExp(value, 'i');
        const isMatch = result => re.test(result.title);

        const results = coinOptions
          .filter(isMatch)
          .map(result => ({ ...result, key: result.id }));

        this.setState({
          isLoading: false,
          noResultsMessage: 'No results found',
          results: results,
        });
      }
    }, 250);
  };

  loadCoinOptions = () => {
    let tempCoinOptions = [];
    for (const [key, value] of Object.entries(this.props.coinList)) {
      let option = {
        id: key,
        title: value.CoinName,
        description: key,
        image: `https://www.cryptocompare.com${value.ImageUrl}`,
      };
      tempCoinOptions.push(option);
    }
    this.setState({ coinOptions: tempCoinOptions });
  };

  onSubmit = event => {
    event.preventDefault();

    const isValidForm = this.checkAddCoinFormValidation();
    if (isValidForm) {
      const coin = {
        name: this.state.selectedCoin,
        quantity: this.state.coinQuantityValue,
      };

      this.props.addCoinToPortfolio(
        coin,
        this.props.portfolio,
        this.props.coinList[coin.name],
      );
      this.props.onCoinSubmit();
    }
  };

  resetSearchComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  render() {
    const { isLoading, searchValue, results } = this.state;
    return (
      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column>
              <Search
                fluid
                loading={isLoading}
                noResultsMessage={this.state.noResultsMessage}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={searchValue}
                size={'tiny'}
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                onChange={event =>
                  this.setState({ coinQuantityValue: event.target.value })
                }
                placeholder="Quantity"
                style={{ height: 42 }}
                type="number"
                value={this.state.coinQuantityValue}
              />
            </Grid.Column>
            <Grid.Column>
              <Button primary loading={this.state.loading} size="small">
                Add
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Message error content={this.state.errorMessage} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinList: state.coinList,
    portfolio: state.portfolio,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCoinToPortfolio,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCoin);
