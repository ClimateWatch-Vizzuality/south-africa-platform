import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';

import PopulationTab from './population-tab';
import DistributionByAge from './distribution-by-age';

import styles from './population-styles.scss';

const POPULATION_KEY = 'population';
const DISTRIBUTION_BY_AGE_KEY = 'distribution-by-age';

class Population extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: 'Population',
          value: POPULATION_KEY,
          component: (
            <PopulationTab
              title="KwaZulu-Natal"
              populations={props.populationList}
              yearsOptions={props.yearsOptions}
              yearSelected={props.yearSelected}
            />
          )
        },
        {
          name: 'Distribution by age',
          value: DISTRIBUTION_BY_AGE_KEY,
          component: (
            <DistributionByAge
              yearsOptions={props.yearsOptions}
              yearSelected={props.yearSelected}
            />
          )
        }
      ]
    };
  }

  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({
      section: 'population',
      query: { ...query, tab: value }
    });
  };

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="Provincial Development Priorities" />
        <TabSwitcher
          tabs={this.state.tabs}
          actionsActive={false}
          searchActive={false}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={this.props.activeTabValue}
        />
      </div>
    );
  }
}

Population.propTypes = {
  query: PropTypes.object,
  populationList: PropTypes.object,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  yearsOptions: PropTypes.array,
  yearSelected: PropTypes.object
};

Population.defaultProps = {
  query: null,
  activeTabValue: null,
  populationList: {},
  yearsOptions: [],
  yearSelected: {}
};

export default Population;
