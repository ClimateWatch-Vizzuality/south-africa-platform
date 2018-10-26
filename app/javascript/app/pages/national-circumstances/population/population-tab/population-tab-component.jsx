import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import { Card, Dropdown } from 'cw-components';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './population-tab-styles.scss';

class PopulationTab extends PureComponent {
  handleYearChange = year => {
    const { onFilterChange } = this.props;
    onFilterChange({ year: year.value });
  };

  render() {
    const { populations, yearsOptions, yearSelected, cardsData } = this.props;

    const dropdown = yearsOptions &&
      (
        <Dropdown
          theme={{ wrapper: styles.dropdown }}
          options={yearsOptions}
          value={yearSelected}
          onValueChange={this.handleYearChange}
          hideResetButton
        />
      );

    const renderCard = data => (
      <Card title={data && data.description} theme={styles}>
        {data && data.value}
      </Card>
    );

    const toolbar = (
      <InfoDownloadToolbox
        slugs="+++population"
        downloadUri="national_circumstance/categories"
      />
    );
    return (
      <div className="section">
        <div className={styles.toolbox}>
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
        </div>
        <div className={styles.columns}>
          <Map events={this.mapEvents} data={populations} />
          <div className="row">
            {
              cardsData && (
              <div className={styles.cards}>
                {renderCard(cardsData.totalPopulation)}
                {renderCard(cardsData.growthRate)}
              </div>
                )
            }
          </div>
        </div>
        <TabletPortraitOnly>
          {toolbar}
        </TabletPortraitOnly>
      </div>
    );
  }
}

PopulationTab.propTypes = {
  populations: PropTypes.object,
  cardsData: PropTypes.object,
  yearsOptions: PropTypes.array,
  yearSelected: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired
};

PopulationTab.defaultProps = {
  populations: {},
  cardsData: {},
  yearsOptions: [],
  yearSelected: {}
};

export default PopulationTab;
