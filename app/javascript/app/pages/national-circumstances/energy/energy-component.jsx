import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { Section, Dropdown } from 'cw-components';
import Chart from 'components/chart';
import NationalCircumstancesProvider from 'providers/national-circumstances-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './energy-styles';

class Energy extends PureComponent {
  handleSourceChange = source => {
    const { onFilterChange } = this.props;
    onFilterChange({ dataSource: source.value });
  };

  handleMetricChange = metric => {
    const { onFilterChange } = this.props;
    onFilterChange({ metric: metric.value });
  };

  handleDownloadClick = () => {
    console.info('TODO: link to download data endpoint', this.props);
  };

  render() {
    const {
      sourceSelected,
      sourceOptions,
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData
    } = this.props;

    const dropdowns = (
      <div className={styles.dropdowWrapper}>
        <Dropdown
          theme={{ wrapper: styles.dropdown }}
          options={sourceOptions}
          value={sourceSelected}
          onValueChange={this.handleSourceChange}
          hideResetButton
        />
        <Dropdown
          theme={{ wrapper: styles.dropdown }}
          options={metricOptions}
          value={metricSelected}
          onValueChange={this.handleMetricChange}
          hideResetButton
        />
      </div>
    );
    const toolbar = (
      <div className={styles.toolbarButtons}>
        <InfoDownloadToolbox slugs="energy" className={styles.buttonWrapper} />
      </div>
    );
    return (
      <React.Fragment>
        <Section theme={styles}>
          <SectionTitle isSubtitle title="Energy supply" />
          <TabletLandscape>
            {matches => {
              if (matches) {
                return (
                  <div className={styles.toolbar}>
                    {dropdowns}
                    {toolbar}
                  </div>
                );
              }
              return dropdowns;
            }}
          </TabletLandscape>
          <div className={styles.chart}>
            <Chart
              type="area"
              dots={false}
              customMessage="Emissions data not available"
              hideRemoveOptions
              {...chartData}
            />
          </div>
          <TabletPortraitOnly>
            {toolbar}
          </TabletPortraitOnly>
        </Section>
        <NationalCircumstancesProvider params={emissionsParams} />
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

Energy.propTypes = {
  chartData: PropTypes.object,
  sourceOptions: PropTypes.array,
  sourceSelected: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  updateFiltersSelected: PropTypes.func.isRequired
};

Energy.defaultProps = {
  chartData: {},
  sourceOptions: [],
  sourceSelected: null,
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null
};

export default Energy;
