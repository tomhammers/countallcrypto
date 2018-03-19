import React, { Component } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

class EditCoinQuantityModal extends Component {
  state = { coinQuantity: 0 };

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.coinQuantity !== this.props.coinQuantity) {
      this.setState({
        coinQuantity: this.props.coinQuantity,
      });
    }
  }

  onSubmit = () => {
    this.props.onEditCoinQuantitySubmit(this.state.coinQuantity);
  }

  render() {
    const { close, coinId, open } = this.props;
    return (
      <Modal size={'mini'} open={open} onClose={close}>
        <Modal.Header>Edit {coinId} quantity</Modal.Header>
        <Modal.Content>
          <Input
            onChange={event =>
              this.setState({ coinQuantity: event.target.value })
            }
            value={this.state.coinQuantity}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close} content="Close" />
          <Button positive onClick={this.onSubmit} content="Submit" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditCoinQuantityModal;
