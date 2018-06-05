import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

import { chartTypeOptions } from '../common/constants';
import { sort_by } from '../common/utils';

class PortfolioChart extends Component {
  formatRadialLabel = e => {
    return `${e.id}(${e.value}%)`;
  };

  render() {
    const { portfolioBreakdown } = this.props;
    portfolioBreakdown.sort(sort_by('Portfolio %'));

    const barData = portfolioBreakdown.map(coin => {
      return {
        coin: coin.key,
        PortfolioPercentage: coin.percOfPortfolio,
      };
    });

    const pieData = portfolioBreakdown.map(coin => {
      return {
        id: coin.name,
        label: coin.key,
        value: coin.percOfPortfolio,
      };
    });

    return (
      <div style={{ height: '450px' }}>
        {this.props.chartType === chartTypeOptions.BarChart ? (
          <ResponsiveBar
            data={barData}
            enableGridX={true}
            keys={['PortfolioPercentage']}
            indexBy="coin"
            margin={{
              top: 10,
              right: 10,
              bottom: 40,
              left: 40,
            }}
            padding={0.2}
            colors="d310"
            colorBy="id"
            borderRadius={3}
            borderColor="inherit:darker(1.6)"
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Portfolio %',
              legendPosition: 'center',
              legendOffset: 36,
            }}
            enableLabel={false}
            animate={true}
            layout="horizontal"
            motionStiffness={90}
            motionDamping={15}
          />
        ) : null}

        {this.props.chartType === chartTypeOptions.PieChart ? (
          <ResponsivePie
            data={pieData}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors="dark2"
            colorBy="id"
            borderColor="inherit:darker(0.6)"
            enableRadialLabels={false}
            enableSlicesLabels={true}
            sliceLabel="label"
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 14,
                symbolSize: 14,
                symbolShape: 'circle',
              },
            ]}
          />
        ) : null}
      </div>
    );
  }
}

PortfolioChart.propTypes = {
  portfolioBreakdown: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    chartType: state.chartType,
  };
}

export default connect(mapStateToProps, null)(PortfolioChart);
