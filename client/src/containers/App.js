import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import CoinList from '../containers/CoinList';
import CoinTotals from '../containers/CoinTotals';
import '../styles/App.css';

const App = props => {
  return (
    <Layout>
      <CoinTotals />
      <CoinList />
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    portfolio: state.portfolio,
  };
}

export default connect(mapStateToProps, null)(App);
