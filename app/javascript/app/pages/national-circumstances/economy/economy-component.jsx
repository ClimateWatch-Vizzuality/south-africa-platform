import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { NoContent } from 'cw-components';
import GDP from './gdp';
import HumanDevelopmentIndex from './human-development-index';

import styles from './economy-styles.scss';

const GDP_KEY = 'gdp';
const GDP_GROWTH_KEY = 'gdp-growth';
const HUMAN_DEVELOPMENT_INDEX_KEY = 'human-development-index';

class Economy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { name: 'GDP', value: GDP_KEY, component: <GDP /> },
        {
          name: 'GDP Growth',
          value: GDP_GROWTH_KEY,
          component: <NoContent message="Section not ready yet" />
        },
        {
          name: 'Human Development Index',
          value: HUMAN_DEVELOPMENT_INDEX_KEY,
          component: <HumanDevelopmentIndex />
        }
      ]
    };
  }

  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ section: 'economy', query: { ...query, tab: value } });
  };

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="Economy" />
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

Economy.propTypes = {
  query: PropTypes.object,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

Economy.defaultProps = { query: null, activeTabValue: null };

export default Economy;
