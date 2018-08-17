import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import {
  Section,
  ButtonGroup,
  Button,
  Icon,
  Dropdown,
  Chart
} from 'cw-components';
import GHGMetaProvider from 'providers/ghg-meta-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import iconInfo from 'assets/icons/info';
import downloadIcon from 'assets/icons/download';

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
          <h2 className={styles.title}>Energy supply</h2>
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
        <GHGMetaProvider />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
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
  setModalMetadata: PropTypes.func.isRequired,
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
