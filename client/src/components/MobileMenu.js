import React from 'react';
import {
  Dropdown,
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
} from 'semantic-ui-react';
import { coinViewOptions, supportedFiatCurrencies } from '../common/constants';

const MobileMenu = props => {
  const {
    balancesShown,
    chartShown,
    exportPortfolio,
    fiatCurrencyValue,
    newPortfolio,
    onPusherClick,
    onToggle,
    portfolioId,
    showUploadFileModal,
    toggleShowEtheremAddressModal,
    updatePortfolioFiatCurrency,
    visible,
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

  return (
    <Container>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          vertical
          visible={visible}
        />
        <Sidebar.Pusher
          dimmed={visible}
          onClick={onPusherClick}
          style={{ minHeight: '100vh' }}
        >
          <Menu secondary>
            <Menu.Item onClick={onToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
};

export default MobileMenu;
