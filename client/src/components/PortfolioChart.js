import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';

import { sort_by } from '../common/utils';

class PortfolioChart extends Component {
  formatRadialLabel = e => {
    return `${e.id}(${e.value}%)`;
  };

  render() {
    const { portfolioBreakdown } = this.props;
    portfolioBreakdown.sort(sort_by('Portfolio %'));

    const data = portfolioBreakdown.map(coin => {
      return {
        coin: coin.key,
        PortfolioPercentage: coin.percOfPortfolio,
      };
    });

    return (
      <div style={{ height: '400px' }}>
        <ResponsiveBar
          data={data}
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
      </div>
    );
  }
}

PortfolioChart.propTypes = {
  portfolioBreakdown: PropTypes.array.isRequired,
};

export default PortfolioChart;

//           radialLabel={e => this.formatRadialLabel(e)}

// radialLabelsSkipAngle={10}
// radialLabelsTextXOffset={6}
// radialLabelsTextColor="#333333"
// radialLabelsLinkOffset={0}
// radialLabelsLinkDiagonalLength={12}
// radialLabelsLinkHorizontalLength={18}
// radialLabelsLinkStrokeWidth={1}
// radialLabelsLinkColor="inherit"

// <ResponsivePie
//           data={data}
//           margin={{
//             top: 40,
//             right: 80,
//             bottom: 80,
//             left: 80,
//           }}
//           innerRadius={0.5}
//           padAngle={0.7}
//           cornerRadius={3}
//           colorBy="id"
//           borderColor="inherit:darker(0.6)"
//           enableSlicesLabels={false}
//           enableRadialLabels={false}
//           slicesLabelsSkipAngle={2}
//           slicesLabelsTextColor="#333333"
//           animate={true}
//           motionStiffness={90}
//           motionDamping={15}
//           legends={[
//             {
//                 "anchor": "bottom",
//                 "direction": "row",
//                 "translateY": 56,
//                 "itemWidth": 100,
//                 "itemHeight": 14,
//                 "symbolSize": 14,
//                 "symbolShape": "circle"
//             }
//         ]}
//         />
