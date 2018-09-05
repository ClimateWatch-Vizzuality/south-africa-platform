import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import { Card, Dropdown } from 'cw-components';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './population-tab-styles.scss';

class PopulationTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { title: props.title };

    this.mapEvents = { onMouseEnter: this.handleMouseEnter };
  }

  handleMouseEnter = geo => {
    const title = geo && geo.properties && geo.properties.name;
    if (title) {
      this.setState({ title });
    }
  };

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
    const { title } = this.state;
    const { populations, yearsOptions, yearSelected } = this.props;

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
        slug="populations"
        handleInfoClick={this.handleInfoClick}
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
          <Map events={this.mapEvents} />
          <div className="row">
            {
              populations &&
                populations[title] &&
                populations[title].length > 0 &&
                (
                  <div className={styles.cards}>
                    {populations[title].map(population => (
                      <Card title={population.description} theme={styles}>
                        {population.title}
                      </Card>
                    ))}
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
  title: PropTypes.string,
  populations: PropTypes.object,
  yearsOptions: PropTypes.array,
  yearSelected: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  setModalMetadata: PropTypes.func.isRequired
};

PopulationTab.defaultProps = {
  title: '',
  populations: {},
  yearsOptions: [],
  yearSelected: {}
};

export default PopulationTab;
