import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import DataTable from 'components/data-table';
import styles from './support-needed-styles.scss';

const FINANCIAL_SUPPORT_NEEDED_KEY = 'financialSupportNeeded';
const NON_MONETIZED_NEEDS = 'nonMonetizedNeeds';

class SupportNeeded extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query, section } = this.props;
    updateQueryParam({ query: { ...query, tab: value }, section });
  };

  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  renderTabs() {
    const { tableData, searchFilter } = this.props;
    return [
      {
        name: 'FINANCIAL SUPPORT NEEDED',
        value: FINANCIAL_SUPPORT_NEEDED_KEY,
        component: (
          <DataTable tableData={tableData} searchFilter={searchFilter} />
        )
      },
      {
        name: 'NON MONETIZED NEEDS',
        value: NON_MONETIZED_NEEDS,
        component: (
          <DataTable tableData={tableData} searchFilter={searchFilter} />
        ),
        disabled: true
      }
    ];
  }

  render() {
    const { searchFilter, activeTabValue } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle title="Support Needed" />
        <TabSwitcher
          tabs={this.renderTabs()}
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

SupportNeeded.propTypes = {
  section: PropTypes.string,
  query: PropTypes.object,
  searchFilter: PropTypes.string,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  tableData: PropTypes.object
};

SupportNeeded.defaultProps = {
  searchFilter: '',
  query: null,
  section: null,
  activeTabValue: null,
  tableData: {}
};

export default SupportNeeded;
