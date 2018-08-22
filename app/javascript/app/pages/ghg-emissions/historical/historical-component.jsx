import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import {
  Section,
  ButtonGroup,
  Button,
  Icon,
  Dropdown,
  Chart
} from 'cw-components';
import MetadataProvider from 'providers/metadata-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import iconInfo from 'assets/icons/info';
import downloadIcon from 'assets/icons/download';

import styles from './historical-styles';

class GHGHistoricalEmissions extends PureComponent {
  handleSectorChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ sector: value });
  };

  handleMetricChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ metric: value });
  };

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
    const {
      sectorSelected,
      sectorOptions,
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData
    } = this.props;

    const dropdowns = (
      <div className={styles.dropdowWrapper}>
        <Dropdown
          label="Sector"
          theme={{ wrapper: styles.dropdown }}
          options={sectorOptions}
          value={sectorSelected}
          onValueChange={this.handleSectorChange}
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
        <ButtonGroup theme={{ wrapper: styles.buttonWrapper }}>
          <Button
            onClick={this.handleInfoClick}
            theme={{ button: styles.infobutton }}
          >
            <Icon icon={iconInfo} />
          </Button>
          <Button
            onClick={this.handleDownloadClick}
            theme={{ button: styles.infobutton }}
          >
            <Icon icon={downloadIcon} />
          </Button>
        </ButtonGroup>
      </div>
    );
    return (
      <React.Fragment>
        <Section theme={styles}>
          <SectionTitle title="Historical emissions" />
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
        <MetadataProvider meta={[ 'sectors', 'ghg' ]} />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

GHGHistoricalEmissions.propTypes = {
  chartData: PropTypes.object,
  sectorOptions: PropTypes.array,
  sectorSelected: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  updateFiltersSelected: PropTypes.func.isRequired
};

GHGHistoricalEmissions.defaultProps = {
  chartData: {},
  sectorOptions: [],
  sectorSelected: null,
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null
};

export default GHGHistoricalEmissions;
