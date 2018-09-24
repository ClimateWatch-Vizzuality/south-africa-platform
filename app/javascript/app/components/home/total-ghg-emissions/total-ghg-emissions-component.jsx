import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import ModalMetadata from 'components/modal-metadata';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { Section, Button, Dropdown } from 'cw-components';
import Chart from 'components/chart';
import MetaProvider from 'providers/metadata-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './total-ghg-emissions-styles';

class TotalGhgEmissions extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      open: true
    });
  };

  handleMetricChange = metric => {
    this.props.updateMetricSelected({ query: { metric: metric.value } });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  render() {
    const {
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData
    } = this.props;

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
          handleInfoClick={this.handleInfoClick}
          className={styles.buttonWrapper}
        />
      </div>
    );
    return (
      <React.Fragment>
        <Section theme={styles}>
          <SectionTitle
            title="Historical Emissions"
            theme={{ sectionTitle: styles.title }}
          />
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
              {...chartData}
            />
          </div>
          <TabletPortraitOnly>
            {toolbar}
          </TabletPortraitOnly>
        </Section>
        <MetaProvider meta="ghg" />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

TotalGhgEmissions.propTypes = {
  chartData: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  updateMetricSelected: PropTypes.func.isRequired
};

TotalGhgEmissions.defaultProps = {
  chartData: {},
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null
};

export default TotalGhgEmissions;
