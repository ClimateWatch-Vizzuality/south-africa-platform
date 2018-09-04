import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Dropdown } from 'cw-components';
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

  render() {
    const {
      searchFilter,
      activeTabValue,
      handleFilterChange,
      options,
      values
    } = this.props;

    const WithDropdowns = ({ content }) => (
      <Fragment>
        {dropdowns}
        {content}
      </Fragment>
    );

    const renderTabs = [
      {
        name: 'INTERNATIONAL',
        value: INTERNATIONAL_KEY,
        component: <WithDropdowns content={<International />} />
      },
      { name: 'DOMESTIC', value: DOMESTIC_KEY, component: null },
      {
        name: 'NON-MONETIZED',
        value: NON_MONETIZED_KEY,
        component: null,
        disabled: true
      }
    ];

    const dropdowns = (
      <div className={styles.dropdownWrapper}>
        <Dropdown
          label="Origin of funds"
          theme={{ wrapper: styles.dropdown }}
          options={options.fundOrigin}
          value={values.fundOrigin}
          onValueChange={option =>
            handleFilterChange('fundOrigin', option.value)}
          hideResetButton
        />
        <Dropdown
          label="Financial flows"
          theme={{ wrapper: styles.dropdown }}
          options={options.financialFlow}
          value={values.financialFlow}
          onValueChange={option =>
            handleFilterChange('financialFlows', option.value)}
          hideResetButton
        />
        <Dropdown
          label="Country"
          theme={{ wrapper: styles.dropdown }}
          options={options.country}
          value={values.country}
          onValueChange={option =>
            handleFilterChange('countryValue', option.value)}
          hideResetButton
        />
        <Dropdown
          label="Chart type"
          theme={{ wrapper: styles.dropdown }}
          options={options.chartType}
          value={values.chartType}
          onValueChange={option =>
            handleFilterChange('chartType', option.value)}
          hideResetButton
        />
      </div>
    );

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
  updateQueryParam: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  values: PropTypes.object
};

SupportReceived.defaultProps = {
  searchFilter: '',
  query: null,
  activeTabValue: null,
  options: {},
  values: {}
};

export default SupportReceived;
