import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Input, Message, Modal } from 'semantic-ui-react';
import web3 from 'web3';

import { addEthereumAddressOptions } from '../common/constants';

class ImportEthereumAddressModal extends Component {
  state = {
    errorMessage: false,
    ethereumAddress: '',
    loading: false,
    selectedEthereumAddressOption: addEthereumAddressOptions[0].value,
  };

  onSubmit = async () => {
    this.setState({ errorMessage: false });

    const isValidAddress = web3.utils.isAddress(this.state.ethereumAddress);
    if (!isValidAddress) {
      this.setState({ errorMessage: true });
      return;
    }
    this.setState({ loading: true });
    await this.props.onSubmit(this.state.ethereumAddress, this.state.selectedEthereumAddressOption);
    this.setState({ loading: false });

  };

  resetComponent = () => {
    this.setState({ errorMessage: false, ethereumAddress: '', loading: false });
  };

  render() {
    const { close, open } = this.props;
    return (
      <Modal
        size={'small'}
        open={open}
        onClose={close}
        onOpen={() => this.resetComponent()}
      >
        <Modal.Header>
          Import Ethereum and ERC20 token balances from address
        </Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder="Enter Ethereum Address"
            value={this.state.ethereumAddress}
            onChange={event =>
              this.setState({ ethereumAddress: event.target.value })
            }
          />
          {this.state.errorMessage ? (
            <Message
              error
              content="Not a valid Ethereum Address"
            />
          ) : null}
          <br/>
          <label>What to do with found balances?</label>
          <Dropdown
            fluid
            labeled
            selection
            onChange={(event, { value }) =>
              this.setState({ selectedEthereumAddressOption: value })
            }
            options={addEthereumAddressOptions}
            value={this.state.selectedEthereumAddressOption}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={this.state.loading}
            negative
            onClick={close}
            content="Close"
          />
          <Button
            disabled={this.state.loading}
            loading={this.state.loading}
            positive
            onClick={this.onSubmit}
            content="Submit"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ImportEthereumAddressModal.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ImportEthereumAddressModal;
