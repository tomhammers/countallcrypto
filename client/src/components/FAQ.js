import React from 'react';
import { Header, List, Segment } from 'semantic-ui-react';

const FAQ = () => {
  return (
    <Segment
      color="yellow"
      raised
      style={{ marginTop: '20px', marginBottom: '40px' }}
    >
      <Header as="h1">FAQ</Header>
      <Header as="h3">About</Header>
      <p>
        CountAllCrypto is a free, open source, privacy focused web application
        to keep track of crypto assets offering the following features:
      </p>
      <List bulleted>
        <List.Item>Supports over 2000 crypto assets.</List.Item>
        <List.Item>No log in or registration.</List.Item>
        <List.Item>No tracking of any kind, not even analytics.</List.Item>
        <List.Item>Portfolio is saved in Browser's cache.</List.Item>
        <List.Item>Import/Export portfolios.</List.Item>
        <List.Item>
          Import Ethereum address to easilly add ETH balance and ERC20 token
          balances.
        </List.Item>
      </List>
      <Header as="h3">How do I create a portfolio?</Header>
      <p>
        You can edit or delete the coins in the default portfolio or go to Menu
        -> New Portfolio. Click on Add Coin to start adding your crypto assets.
      </p>
      <Header as="h3">How is my portfolio stored?</Header>
      <p>
        Portfolio is automatically stored in the browser's cache meaning you can
        close the browser window and your portfolio will still be there when you
        return later. If you need to clear the brower's cache toy may export
        your portfolio first so you can easily restore it later.
      </p>
      <br />
      <p>
        Optionally you may obtain a unique URL and we can store your portfolio
        on the web application's server for convienient retrieval. You can
        activate this option by going to Menu -> Get a unique URL
      </p>
    </Segment>
  );
};

export default FAQ;
