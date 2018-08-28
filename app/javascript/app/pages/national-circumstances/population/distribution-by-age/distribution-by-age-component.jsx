import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'cw-components';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import SimpleBarChart from 'components/simple-bar-chart';
import DistributionByAgeProvider from 'providers/distribution-by-age-provider';

import styles from './distribution-by-age-styles.scss';

class PopulationTab extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      open: true
    });
  };

  handleYearChange = year => {
    const { onFilterChange } = this.props;
    onFilterChange({ year: year.value });
  };

  render() {
    const { yearsOptions, yearSelected, data, domain, config } = this.props;

    const dropdown = (
      <Dropdown
        theme={{ wrapper: styles.dropdown }}
        options={yearsOptions}
        value={yearSelected}
        onValueChange={this.handleYearChange}
        hideResetButton
      />
    );

    const toolbar = (
      <InfoDownloadToolbox
        slug="distribution-by-age"
        handleInfoClick={this.handleInfoClick}
      />
    );

    return (
      <div className="section">
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
        <SimpleBarChart
          config={config}
          data={data}
          domain={domain}
          height={500}
          barDataKey="y"
        />
        <TabletPortraitOnly>
          {toolbar}
        </TabletPortraitOnly>
        <DistributionByAgeProvider />
      </div>
    );
  }
}

PopulationTab.propTypes = {
  yearsOptions: PropTypes.array,
  yearSelected: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  data: PropTypes.array,
  config: PropTypes.object,
  domain: PropTypes.object
};

PopulationTab.defaultProps = {
  yearsOptions: [],
  yearSelected: {},
  data: [],
  config: {},
  domain: {}
};

export default PopulationTab;
