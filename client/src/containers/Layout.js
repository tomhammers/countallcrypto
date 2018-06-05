import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Dropdown,
  Segment,
  Menu,
  Icon,
  Sidebar,
} from 'semantic-ui-react';
import '../styles/Layout.css';
// actions
import {
  addPortfolioId,
  changePortfolioFiatCurrency,
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

import SidebarMenu from './SidebarMenu';

import { supportedFiatCurrencies } from '../common/constants';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }

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

    return (
      <Container>
        <Menu secondary>
          <Menu.Item
            onClick={() =>
              this.setState({ menuVisible: !this.state.menuVisible })
            }
          >
            <Icon name="sidebar" size="large" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown
              item
              onChange={(event, { value }) =>
                this.props.changePortfolioFiatCurrency(value, portfolio)
              }
              options={supportedFiatCurrencies}
              value={portfolio.fiatCurrency.value}
            />
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable as={Segment} attached="bottom">
          <SidebarMenu
            closeMenu={() => this.setState({ menuVisible: false })}
            visible={this.state.menuVisible}
          />
          <Sidebar.Pusher dimmed={this.state.menuVisible}>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
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
      changePortfolioFiatCurrency,
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

// export default props => {
//   return (
//     <Container>
//       <Header />
//       {props.children}
//     </Container>
//   );
// };
