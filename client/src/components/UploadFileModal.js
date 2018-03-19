import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Message, Modal } from 'semantic-ui-react';

class UploadFileModal extends Component {
  state = {
    errorMessage: '',
    file: {},
    fileContents: {},
  };

  checkIfEmptyObject(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  }

  handleFileInputChange = file => {
    let fileReader = new FileReader();

    fileReader.onload = e => {
      this.setState({ file, fileContents: e.target.result });
    };
    fileReader.readAsText(file);
  };

  onFileSubmit = () => {
    const { file, fileContents } = this.state;
    if (this.checkIfEmptyObject(file) || this.checkIfEmptyObject(fileContents)) {
      this.setState({ errorMessage: 'Please choose a file' });
    } else {
      const portfolio = JSON.parse(this.state.fileContents);
      this.props.onSubmit(portfolio);
    }
  };

  render() {
    const { close, open } = this.props;
    return (
      <Modal size={'small'} open={open} onClose={close}>
        <Modal.Header>Import an existing portfolio</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            onChange={e => this.handleFileInputChange(e.target.files[0])}
            placeholder="Enter Ethereum Address"
            type="file"
          />
          {this.state.errorMessage ? (
            <Message error content={this.state.errorMessage} />
          ) : null}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close} negative content="Close" />
          <Button onClick={this.onFileSubmit} positive content="Submit" />
        </Modal.Actions>
      </Modal>
    );
  }
}

UploadFileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default UploadFileModal;
