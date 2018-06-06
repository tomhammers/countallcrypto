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
import { changePortfolioFiatCurrency } from '../actions/portfolioActions';

import SidebarMenu from './SidebarMenu';
import { supportedFiatCurrencies } from '../common/constants';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }

  render() {
    const { portfolio } = this.props;

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
    portfolio: state.portfolio,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePortfolioFiatCurrency,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
