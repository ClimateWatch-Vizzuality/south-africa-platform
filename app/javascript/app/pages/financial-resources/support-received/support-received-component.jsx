import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import styles from './support-received-styles.scss';

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

  // const dropdowns = (
  //   <div className={styles.dropdowWrapper}>
  //     <Dropdown
  //       theme={{ wrapper: styles.dropdown }}
  //       options={sourceOptions}
  //       value={sourceSelected}
  //       onValueChange={this.handleSourceChange}
  //       hideResetButton
  //     />
  //     <Dropdown
  //       theme={{ wrapper: styles.dropdown }}
  //       options={metricOptions}
  //       value={metricSelected}
  //       onValueChange={this.handleMetricChange}
  //       hideResetButton
  //     />
  //   </div>
  // );
  render() {
    const { searchFilter, activeTabValue } = this.props;
    const renderTabs = [
      { name: 'INTERNATIONAL', value: INTERNATIONAL_KEY, component: null },
      { name: 'DOMESTIC', value: DOMESTIC_KEY, component: null },
      { name: 'NON-MONETIZED', value: NON_MONETIZED_KEY, component: null }
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
          actionsActive={false}
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
