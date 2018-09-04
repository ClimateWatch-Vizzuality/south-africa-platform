import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { ChartComposed } from 'cw-components';
import { Area, Line } from 'recharts';
import MetaProvider from 'providers/metadata-provider';
import GdpGrowthProvider from 'providers/gdp-growth-provider';
import { CustomYAxisTick } from './axis-ticks';
import GdpTooltip from './gdp-tooltip-chart';

import styles from './gdp-growth-styles';

class GDPGrowth extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      open: true
    });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  render() {
    const { chartData } = this.props;
    const lineChart = (
      <Line
        key="yG"
        dataKey="yG"
        isAnimationActive={false}
        dot={false}
        stroke="#0E9560"
        type="linear"
        strokeWidth={2}
      />
    );

    const greyArea = (
      <Area
        key="greyArea"
        dataKey="greyArea"
        dot={false}
        stroke="#F6F8F8"
        strokeWidth={2}
        fill="#F6F8F8"
        type="linear"
      />
    );

    return (
      <React.Fragment>
        <div className={styles.toolbar}>
          <InfoDownloadToolbox
            slug="economy"
            handleInfoClick={this.handleInfoClick}
          />
        </div>
        <div className={styles.chart}>
          {
            chartData && (
            <ChartComposed
              height={500}
              {...chartData}
              customYAxisTick={<CustomYAxisTick />}
              customTooltip={<GdpTooltip />}
              areaAsBackgroundForCartesianGrid={greyArea}
            >
              {lineChart}
            </ChartComposed>
              )
          }
        </div>
        <MetaProvider meta="ghg" />
        <GdpGrowthProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

GDPGrowth.propTypes = {
  chartData: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired
};

GDPGrowth.defaultProps = { chartData: {} };

export default GDPGrowth;
