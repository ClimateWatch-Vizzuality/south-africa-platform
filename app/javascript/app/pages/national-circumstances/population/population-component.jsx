import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import NationalCircumstancesProvider from 'providers/national-circumstances-provider';
import PopulationTab from './population-tab';
import DistributionByAge from './distribution-by-age';

import styles from './population-styles.scss';

const POPULATION_KEY = 'population';
const DISTRIBUTION_BY_AGE_KEY = 'distribution-by-age';

class Population extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({
      section: 'population',
      query: { ...query, tab: value }
    });
  };

  renderTabs() {
    const {
      populationList,
      yearsOptions,
      yearSelected,
      cardsData
    } = this.props;
    return [
      {
        name: 'Population',
        value: POPULATION_KEY,
        component: (
          <PopulationTab
            title="KwaZulu-Natal"
            populations={populationList}
            cardsData={cardsData}
            yearsOptions={yearsOptions}
            yearSelected={yearSelected}
          />
        )
      },
      {
        name: 'Distribution by age',
        value: DISTRIBUTION_BY_AGE_KEY,
        component: (
          <DistributionByAge
            yearsOptions={yearsOptions}
            yearSelected={yearSelected}
          />
        )
      }
    ];
  }

  render() {
    const { activeTabValue, title, description } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title={title} description={description} />
        <TabSwitcher
          tabs={this.renderTabs()}
          actionsActive={false}
          searchActive={false}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
        />
        <NationalCircumstancesProvider />
      </div>
    );
  }
}
Population.propTypes = {
  query: PropTypes.object,
  populationList: PropTypes.object,
  cardsData: PropTypes.object,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  yearsOptions: PropTypes.array,
  yearSelected: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
Population.defaultProps = {
  query: null,
  activeTabValue: null,
  populationList: {},
  cardsData: {},
  yearsOptions: [],
  yearSelected: {}
};
export default Population;
