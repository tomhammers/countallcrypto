import React from 'react';
import { Button, Dropdown, Checkbox, Modal } from 'semantic-ui-react';

import { chartTypeOptions, coinViewOptions } from '../common/constants';

const graphOptions = [];
const coinOptions = [];

for (let key in chartTypeOptions) {
  graphOptions.push({ text: chartTypeOptions[key], value: chartTypeOptions[key] });
}

for (let key in coinViewOptions) {
  coinOptions.push({ text: coinViewOptions[key], value: coinViewOptions[key] });
}

const DisplaySettingsModal = ({
  balancesShown,
  chartShown,
  chartType,
  close,
  coinView,
  open,
  toggleChartType,
  toggleCoinView,
  toggleShowBalances,
  toggleShowChart,
}) => (
  <Modal open={open}>
    <Modal.Header>Display Settings</Modal.Header>
    <Modal.Content>
      <Checkbox
        checked={balancesShown}
        label="Show balances"
        onChange={(event, data) => toggleShowBalances(data.checked)}
        toggle
      />{' '}
      <br /> <br />
      <Checkbox
        checked={chartShown}
        label="Show chart"
        onChange={(event, data) => toggleShowChart(data.checked)}
        toggle
      />
      <br /> <br />
      <label>Chart Type:</label>
      <Dropdown
        fluid
        labeled
        selection
        onChange={(event, { value }) => toggleChartType(value)}
        options={graphOptions}
        value={chartType}
      />
      <br />
      <label>Assets view:</label>
      <Dropdown
        fluid
        labeled
        selection
        onChange={(event, { value }) => toggleCoinView(value)}
        options={coinOptions}
        value={coinView}
      />
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={close} content="Close" />
    </Modal.Actions>
  </Modal>
);

export default DisplaySettingsModal;
