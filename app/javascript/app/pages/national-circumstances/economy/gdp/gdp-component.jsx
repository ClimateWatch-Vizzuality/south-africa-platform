import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { Dropdown, Chart } from 'cw-components';
import MetaProvider from 'providers/metadata-provider';
import GdpProvider from 'providers/gdp-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import { CustomYAxisTick } from './axis-ticks';

import styles from './gdp-styles';

class GDP extends PureComponent {
  handleMetricChange = metric => {
    const { updateMetricSelected } = this.props;
    updateMetricSelected({
      section: 'economy',
      query: { metric: metric.value }
    });
  };

  render() {
    const { metricSelected, metricOptions, gdpParams, chartData } = this.props;

    const dropdown = (
      <Dropdown
        theme={{ wrapper: styles.dropdown }}
        options={metricOptions}
        value={metricSelected}
        onValueChange={this.handleMetricChange}
        hideResetButton
      />
    );
    const toolbar = <InfoDownloadToolbox slugs="economy" />;
    return (
      <React.Fragment>
        <TabletLandscape>
          {matches => {
            if (matches) {
              return (
                <div className={styles.toolbar}>
                  {dropdown}
                  {toolbar}
                </div>
              );
            }
            return dropdown;
          }}
        </TabletLandscape>
        <div className={styles.chart}>
          <Chart
            type="line"
            dots={false}
            customMessage="GDP data not available"
            hideRemoveOptions
            customYAxisTick={<CustomYAxisTick />}
            {...chartData}
          />
        </div>
        <TabletPortraitOnly>
          {toolbar}
        </TabletPortraitOnly>
        <MetaProvider meta="ghg" />
        {gdpParams && <GdpProvider params={gdpParams} />}
        <WorldBankProvider />
      </React.Fragment>
    );
  }
}

GDP.propTypes = {
  chartData: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  gdpParams: PropTypes.object,
  updateMetricSelected: PropTypes.func.isRequired
};

GDP.defaultProps = {
  chartData: {},
  metricOptions: [],
  metricSelected: null,
  gdpParams: null
};

export default GDP;
