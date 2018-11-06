import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { Section, Multiselect, Dropdown } from 'cw-components';
import Chart from 'components/chart';
import MetadataProvider from 'providers/metadata-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import ModalInfo from 'components/modal-info';

import styles from './historical-styles';

class GHGHistoricalEmissions extends PureComponent {
  handleFieldChange = (field, values) => {
    const { onFilterChange, sectorOptions } = this.props;
    if (values && values.length > 0) {
      if (field === 'sector') {
        const subSectors = [];
        const sectors = [];
        values.forEach(v => {
          if (!sectorOptions.map(o => o.label).includes(v.label)) {
            subSectors.push(v.value);
          } else {
            sectors.push(v.value);
          }
        });
        onFilterChange({
          sector: sectors.join(','),
          subSector: subSectors.join(',')
        });
      } else {
        onFilterChange({ [field]: values.map(v => v.value).join(',') });
      }
    }
  };

  handleMetricChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ metric: value });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  render() {
    const {
      sectorSelected,
      sectorOptions,
      subSectorSelected,
      subSectorOptions,
      gasSelected,
      gasOptions,
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData,
      downloadUri
    } = this.props;
    const dropdowns = (
      <div className={styles.dropdowWrapper}>
        <Multiselect
          label="Sector"
          theme={{ wrapper: styles.dropdown }}
          values={sectorSelected || []}
          options={sectorOptions || []}
          onValueChange={v => this.handleFieldChange('sector', v)}
          hideResetButton
        />
        <Multiselect
          label="Sub sector"
          theme={{ wrapper: styles.dropdown }}
          values={subSectorSelected || []}
          options={subSectorOptions || []}
          onValueChange={v => this.handleFieldChange('subSector', v)}
          hideResetButton
        />
        <Multiselect
          label="Gas"
          theme={{ wrapper: styles.dropdown }}
          values={gasSelected || []}
          options={gasOptions || []}
          onValueChange={v => this.handleFieldChange('gas', v)}
          hideResetButton
        />
        <Dropdown
          label="Metric"
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
        <InfoDownloadToolbox
          slugs="DEA2017b"
          downloadUri={downloadUri}
          className={styles.buttonWrapper}
        />
      </div>
    );
    return (
      <React.Fragment>
        <Section theme={styles}>
          <SectionTitle isSubtitle title="Historical emissions" infoButton />
          <ModalInfo title="Historical emissions">
            This section presents a summary of South Africa’s most recent GHG inventory, covering the following emissions sectors: Energy; Industrial Processes and Product Use; Agriculture, Forestry and Other Land Use; and Waste. Full details are reported in South Africa’s 2017 GHG National Inventory Report.
          </ModalInfo>
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
              type="line"
              height={450}
              dots={false}
              customMessage="Emissions data not available"
              onLegendChange={v => this.handleFieldChange('sector', v)}
              {...chartData}
            />
          </div>
          <TabletPortraitOnly>
            {toolbar}
          </TabletPortraitOnly>
        </Section>
        <MetadataProvider meta="ghg" />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}
GHGHistoricalEmissions.propTypes = {
  chartData: PropTypes.object,
  subSectorOptions: PropTypes.array,
  subSectorSelected: PropTypes.array,
  sectorOptions: PropTypes.array,
  sectorSelected: PropTypes.array,
  gasOptions: PropTypes.array,
  gasSelected: PropTypes.array,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  updateFiltersSelected: PropTypes.func.isRequired,
  downloadUri: PropTypes.string
};
GHGHistoricalEmissions.defaultProps = {
  chartData: {},
  sectorOptions: [],
  sectorSelected: null,
  subSectorOptions: [],
  subSectorSelected: null,
  gasOptions: [],
  gasSelected: null,
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null,
  downloadUri: null
};
export default GHGHistoricalEmissions;
