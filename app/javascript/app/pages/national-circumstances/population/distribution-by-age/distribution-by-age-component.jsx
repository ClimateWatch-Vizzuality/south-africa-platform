import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'cw-components';
import Chart from 'components/chart';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';

import styles from './distribution-by-age-styles.scss';

class PopulationTab extends PureComponent {
  handleYearChange = year => {
    const { onFilterChange } = this.props;
    onFilterChange({ year: year.value });
  };

  render() {
    const { yearsOptions, yearSelected, barChartData } = this.props;

    const data = barChartData && barChartData.data || null;
    const config = barChartData && barChartData.config || null;
    const domain = barChartData && barChartData.domain || null;

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
        slugs="distribution-by-age"
        downloadUri="national_circumstance/categories"
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
        <Chart
          type="bar"
          config={config}
          data={data}
          domain={domain}
          height={500}
          customMessage="No data"
        />
        <TabletPortraitOnly>
          {toolbar}
        </TabletPortraitOnly>
      </div>
    );
  }
}

PopulationTab.propTypes = {
  yearsOptions: PropTypes.array,
  yearSelected: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  barChartData: PropTypes.object
};

PopulationTab.defaultProps = {
  yearsOptions: [],
  yearSelected: {},
  barChartData: {}
};

export default PopulationTab;
