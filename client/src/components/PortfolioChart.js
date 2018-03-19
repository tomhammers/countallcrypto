import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Legend, PieChart } from 'react-easy-chart';

import ToolTip from './ToolTip';

class PortfolioChart extends Component {
  state = {
    showToolTip: false,
  };

  mouseOverHandler = (d, e) => {
    this.setState({
      showToolTip: true,
      top: `${e.y - 10}px`,
      left: `${e.x + 10}px`,
      value: d.data.name,
      key: d.data.key,
      percOfPortfolio: d.data.percOfPortfolio,
    });
  };

  mouseMoveHandler = (d, e) => {
    if (this.state.showToolTip) {
      this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
    }
  };

  mouseOutHandler = () => {
    this.setState({ showToolTip: false });
  };

  createTooltip = () => {
    if (this.state.showToolTip) {
      return (
        <ToolTip top={this.state.top} left={this.state.left}>
          {this.state.value}: {this.state.percOfPortfolio}%
        </ToolTip>
      );
    }
    return false;
  };

  render() {
    const { portfolioBreakdown } = this.props;
    const customStyle = {
      '.legend': {
        fontSize: '0.8em',
        paddingTop: '20px',
      },
    };
    return (
      <div>
        {this.createTooltip()}
        <PieChart
          data={portfolioBreakdown}
          innerHoleSize={130}
          mouseOverHandler={this.mouseOverHandler}
          mouseOutHandler={this.mouseOutHandler}
          mouseMoveHandler={this.mouseMoveHandler}
          size={220}
        />
        <Legend
          data={portfolioBreakdown}
          dataId={'key'}
          horizontal
          styles={customStyle}
        />
      </div>
    );
  }
}

PortfolioChart.propTypes = {
  portfolioBreakdown: PropTypes.array.isRequired,
};

export default PortfolioChart;
