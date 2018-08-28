import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { Dropdown, Chart } from 'cw-components';
import MetaProvider from 'providers/metadata-provider';
import GdpProvider from 'providers/gdp-provider';
import WorldBankProvider from 'providers/world-bank-provider';

import styles from './gdp-styles';

class GDP extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      open: true
    });
  };

  handleMetricChange = metric => {
    this.props.updateMetricSelected({
      section: 'economy',
      query: { metric: metric.value }
    });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
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
    const toolbar = (
      <InfoDownloadToolbox
        slug="economy"
        handleInfoClick={this.handleInfoClick}
      />
    );
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
            {...chartData}
          />
        </div>
        <TabletPortraitOnly>
          {toolbar}
        </TabletPortraitOnly>
        <MetaProvider meta="ghg" />
        {gdpParams && <GdpProvider params={gdpParams} />}
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

GDP.propTypes = {
  chartData: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  gdpParams: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  updateMetricSelected: PropTypes.func.isRequired
};

GDP.defaultProps = {
  chartData: {},
  metricOptions: [],
  metricSelected: null,
  gdpParams: null
};

export default GDP;
