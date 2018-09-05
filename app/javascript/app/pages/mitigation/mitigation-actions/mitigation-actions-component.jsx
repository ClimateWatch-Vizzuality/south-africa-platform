import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import GHGInventoryProvider from 'providers/ghg-inventory-provider';
import DataTable from 'components/data-table';
import styles from './mitigation-actions-styles.scss';

const ALL_ACTIONS_KEY = 'allActions';
const WITH_QUANTIFIED_EFFECTS_KEY = 'quantifiedEffects';
const WITHOUT_QUANTIFIED_EFFECTS_KEY = 'withoutQuantifiedEffects';

class GHGInventory extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, tab: value } });
  };

  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  renderTabs() {
    const { tableData, searchFilter } = this.props;
    return [
      {
        name: 'ALL ACTIONS',
        value: ALL_ACTIONS_KEY,
        component: (
          <DataTable tableData={tableData} searchFilter={searchFilter} />
        )
      },
      {
        name: 'WITH QUANTIFIED EFFECTS',
        value: WITH_QUANTIFIED_EFFECTS_KEY,
        disabled: true,
        component: (
          <DataTable tableData={tableData} searchFilter={searchFilter} />
        )
      },
      {
        name: 'WITHOUT QUANTIFIED EFFECTS',
        value: WITHOUT_QUANTIFIED_EFFECTS_KEY,
        disabled: true,
        component: (
          <DataTable tableData={tableData} searchFilter={searchFilter} />
        )
      }
    ];
  }

  render() {
    const { searchFilter, activeTabValue } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle title="GHG Inventory Improvement Programme" />
        <TabSwitcher
          tabs={this.renderTabs()}
          searchFilter={searchFilter}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
        />
        <GHGInventoryProvider />
      </div>
    );
  }
}

GHGInventory.propTypes = {
  query: PropTypes.object,
  searchFilter: PropTypes.string,
  tableData: PropTypes.shape({
    data: PropTypes.array,
    defaultColumns: PropTypes.array,
    ellipsisColumns: PropTypes.array
  }),
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

GHGInventory.defaultProps = {
  searchFilter: '',
  query: null,
  tableData: {},
  activeTabValue: null
};

export default GHGInventory;
