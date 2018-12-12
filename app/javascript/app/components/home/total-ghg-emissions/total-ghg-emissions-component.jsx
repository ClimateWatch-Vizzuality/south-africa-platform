import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { Section, Button, Dropdown } from 'cw-components';
import Chart from 'components/chart';
import MetaProvider from 'providers/metadata-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { format } from 'd3-format';
import { has } from 'lodash';
import styles from './total-ghg-emissions-styles';

class TotalGhgEmissions extends PureComponent {
  handleMetricChange = metric => {
    const { updateMetricSelected } = this.props;
    updateMetricSelected({ query: { metric: metric.value } });
  };

  render() {
    const {
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData,
      downloadUri,
      contentData
    } = this.props;
    const scale = has(chartData, 'config.axes.yLeft.scale')
      ? chartData.config.axes.yLeft.scale
      : 1;
    const d3Format = has(chartData, 'config.axes.yLeft.format')
      ? chartData.config.axes.yLeft.format
      : '~d';
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
      <div className={styles.toolbarButtons}>
        <Button
          link={
            <Link to="/ghg-emissions" onTouchStart={null} onMouseDown={null} />
          }
          theme={{ button: styles.button }}
        >
          Explore GHG Emissions
        </Button>
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
          <SectionTitle
            title={contentData.title}
            theme={{ sectionTitle: styles.title }}
          />
          <p className={styles.description}>
            {contentData.description}
          </p>
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
              customMessage="Emissions data not available"
              hideRemoveOptions
              getCustomYLabelFormat={value => format(d3Format)(value / scale)}
              {...chartData}
              showUnit
            />
          </div>
          <TabletPortraitOnly>
            {toolbar}
          </TabletPortraitOnly>
        </Section>
        <MetaProvider meta="ghg" />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
      </React.Fragment>
    );
  }
}
TotalGhgEmissions.propTypes = {
  chartData: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  updateMetricSelected: PropTypes.func.isRequired,
  downloadUri: PropTypes.string,
  contentData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  })
};
TotalGhgEmissions.defaultProps = {
  chartData: {},
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null,
  downloadUri: null,
  contentData: {}
};
export default TotalGhgEmissions;
