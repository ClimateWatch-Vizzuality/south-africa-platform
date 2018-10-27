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
import { format } from 'd3-format';

import styles from './energy-styles';

class Energy extends PureComponent {
  handleFilterChange = (field, value) => {
    const { onFilterChange } = this.props;
    onFilterChange({ [field]: value.value });
  };

  handleSectorChange = values => {
    const { onFilterChange } = this.props;
    if (values && values.length > 0) {
      onFilterChange({ sector: values.map(v => v.value).join(',') });
    }
  };

  handleDownloadClick = () => {
    console.info('TODO: link to download data endpoint', this.props);
  };

  render() {
    const {
      metricSelected,
      metricOptions,
      chartTypeSelected,
      chartTypeOptions,
      chartData
    } = this.props;
    const dropdowns = (
      <div className={styles.dropdowWrapper}>
        <Dropdown
          theme={{ wrapper: styles.dropdown }}
          options={metricOptions}
          value={metricSelected}
          onValueChange={value => this.handleFilterChange('metric', value)}
          hideResetButton
        />
        <Dropdown
          theme={{ wrapper: styles.dropdown }}
          options={chartTypeOptions}
          value={chartTypeSelected}
          onValueChange={value => this.handleFilterChange('chartType', value)}
          hideResetButton
        />
      </div>
    );
    const toolbar = (
      <div className={styles.toolbarButtons}>
        <InfoDownloadToolbox
          slugs="DOE"
          downloadUri="national_circumstance/categories"
          className={styles.buttonWrapper}
        />
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
              type={chartTypeSelected.value}
              dots={false}
              customMessage="Emissions data not available"
              onLegendChange={this.handleSectorChange}
              getCustomYLabelFormat={value => format('~s')(value)}
              {...chartData}
            />
          </div>
          <TabletPortraitOnly>
            {toolbar}
          </TabletPortraitOnly>
        </Section>
        <NationalCircumstancesProvider />
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

Energy.propTypes = {
  chartData: PropTypes.object,
  chartTypeOptions: PropTypes.array,
  chartTypeSelected: PropTypes.object,
  chartType: PropTypes.string,
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
  chartTypeOptions: [],
  chartTypeSelected: null,
  chartType: 'line',
  sourceOptions: [],
  sourceSelected: null,
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null
};

export default Energy;
