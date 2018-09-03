import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import styles from './support-received-styles.scss';
import International from './international';

const INTERNATIONAL_KEY = 'international';
const DOMESTIC_KEY = 'domestic';
const NON_MONETIZED_KEY = 'nonMonetized';

class SupportReceived extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, tab: value } });
  };

  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  render() {
    const { searchFilter, activeTabValue } = this.props;
    const renderTabs = [
      {
        name: 'INTERNATIONAL',
        value: INTERNATIONAL_KEY,
        component: <International />
      },
      { name: 'DOMESTIC', value: DOMESTIC_KEY, component: null },
      {
        name: 'NON-MONETIZED',
        value: NON_MONETIZED_KEY,
        component: null,
        disabled: true
      }
    ];

    return (
      <div className={styles.row}>
        <SectionTitle title="Support Received" />
        <TabSwitcher
          tabs={renderTabs}
          searchFilter={searchFilter}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
        />
      </div>
    );
  }
}

SupportReceived.propTypes = {
  query: PropTypes.object,
  searchFilter: PropTypes.string,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

SupportReceived.defaultProps = {
  searchFilter: '',
  query: null,
  activeTabValue: null
};

export default SupportReceived;
