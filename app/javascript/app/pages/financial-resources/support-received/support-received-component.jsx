import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Dropdown } from 'cw-components';
import FinancialResourcesReceivedProvider from 'providers/financial-resources-received-provider/financial-resources-received-provider';
import styles from './support-received-styles.scss';
import SupportReceivedChart from './support-received-chart';

const INTERNATIONAL_KEY = 'international';
const DOMESTIC_KEY = 'domestic';
const NON_MONETIZED_KEY = 'nonMonetized';

class SupportReceived extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query, section } = this.props;
    updateQueryParam({ query: { ...query, tab: value }, section });
  };

  renderDropdowns() {
    const { handleFilterChange, options, values, dropdownConfig } = this.props;
    return (
      <div className={styles.dropdownWrapper}>
        {dropdownConfig.map(d => (
          <Dropdown
            key={d.label}
            label={d.label}
            theme={{ wrapper: styles.dropdown }}
            options={options[d.slug] || []}
            value={values[d.slug]}
            onValueChange={option => handleFilterChange(d.slug, option.value)}
            hideResetButton
          />
        ))}
      </div>
    );
  }

  render() {
    const { activeTabValue, data } = this.props;
    const WithDropdowns = ({ children }) => (
      <Fragment>
        {this.renderDropdowns()}
        {children}
      </Fragment>
    );
    const component = (
      <WithDropdowns>
        <SupportReceivedChart data={data} />
      </WithDropdowns>
    );
    const renderTabs = [
      { name: 'INTERNATIONAL', value: INTERNATIONAL_KEY, component },
      { name: 'DOMESTIC', value: DOMESTIC_KEY, component },
      { name: 'NON-MONETIZED', value: NON_MONETIZED_KEY, component }
    ];

    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title="Support Received" />
        <TabSwitcher
          tabs={renderTabs}
          searchActive={false}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
        />
        <FinancialResourcesReceivedProvider />
      </div>
    );
  }
}

SupportReceived.propTypes = {
  query: PropTypes.object,
  section: PropTypes.string,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  values: PropTypes.object,
  dropdownConfig: PropTypes.array,
  data: PropTypes.array
};

SupportReceived.defaultProps = {
  data: null,
  query: null,
  dropdownConfig: [],
  section: null,
  activeTabValue: null,
  options: {},
  values: {}
};

export default SupportReceived;
