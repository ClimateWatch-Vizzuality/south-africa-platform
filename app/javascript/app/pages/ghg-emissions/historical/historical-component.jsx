import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { Section, Multiselect, Dropdown } from 'cw-components';
import { Line } from 'recharts';
import has from 'lodash/has';
import Chart from 'components/chart';
import MetadataProvider from 'providers/metadata-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { format } from 'd3-format';
import styles from './historical-styles';

class GHGHistoricalEmissions extends PureComponent {
  handleLegendChange = values => {
    const { onFilterChange, sectorOptions } = this.props;
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
  };

  handleFieldChange = (field, values) => {
    const { onFilterChange } = this.props;
    if (field === 'legendSector') {
      this.handleLegendChange(values);
    } else {
      onFilterChange({ [field]: values.map(v => v.value).join(',') });
    }
  };

  handleMetricChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ metric: value });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  renderDotsLines = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { config } = this.props.chartData;
    return config &&
      has(config, 'columns.dots') &&
      config.columns.dots.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Line
            key={column.value}
            dataKey={column.value}
            stroke={color}
            strokeDasharray="1,09"
            strokeWidth="5"
            strokeLinecap="round"
            type="monotone"
            isAnimationActive={false}
            dot={false}
          />
        );
      });
  };

  renderLines = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { config } = this.props.chartData;
    return config &&
      has(config, 'columns.lines') &&
      config.columns.lines.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Line
            key={column.value}
            dot={false}
            dataKey={column.value}
            stroke={color}
            strokeWidth={2}
            isAnimationActive={false}
            type="monotone"
          />
        );
      });
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
      downloadUri,
      title,
      description
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
          <SectionTitle isSubtitle title={title} description={description} />
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
            {
              chartData && chartData.config && (
              <Chart
                chartType="composed"
                type="line"
                height={450}
                customMessage="Emissions data not available"
                onLegendChange={v =>
                      this.handleFieldChange('legendSector', v)}
                {...chartData}
                getCustomYLabelFormat={value =>
                      `${format('.2s')(`${value}`).replace('G', 'B')}`}
                showUnit
                isAnimationActive={false}
              >
                {this.renderDotsLines()}
                {this.renderLines()}
              </Chart>
                )
            }
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
  downloadUri: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
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
