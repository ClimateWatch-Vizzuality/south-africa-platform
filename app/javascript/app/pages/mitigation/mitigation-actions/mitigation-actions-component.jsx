import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import GHGInventoryProvider from 'providers/ghg-inventory-provider';
import { NoContent, Loading, Table } from 'cw-components';

import styles from './mitigation-actions-styles.scss';

const ALL_ACTIONS_KEY = 'allActions';
const WITH_QUANTIFIED_EFFECTS_KEY = 'quantifiedEffects';
const WITHOUT_QUANTIFIED_EFFECTS_KEY = 'withoutQuantifiedEffects';

class GHGInventory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: 'ALL ACTIONS',
          value: ALL_ACTIONS_KEY,
          component: <Loading height="660" />
        },
        {
          name: 'WITH QUANTIFIED EFFECTS',
          value: WITH_QUANTIFIED_EFFECTS_KEY,
          disabled: true,
          component: <Loading height="660" />
        },
        {
          name: 'WITHOUT QUANTIFIED EFFECTS',
          value: WITHOUT_QUANTIFIED_EFFECTS_KEY,
          disabled: true,
          component: <Loading height="660" />
        }
      ]
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tableData.data) {
      const activeTabValue = props.activeTabValue || state.tabs[0].value;
      return {
        ...state,
        tabs: state.tabs.map(tab => {
          if (tab.value === activeTabValue) {
            const hasContent = props.tableData.data &&
              props.tableData.data.length > 0;
            return {
              ...tab,
              component: hasContent
                ? (
                  <Table
                    horizontalScroll
                    tableHeight={660}
                    setRowsHeight={() => 120}
                    hasColumnSelect={false}
                    {...props.tableData}
                  />
)
                : (
                  <NoContent
                    minHeight={330}
                    message={
                    props.searchFilter
                      ? 'No data found with this search'
                      : 'No data available'
                  }
                  />
)
            };
          }
          return tab;
        })
      };
    }
    return state;
  }

  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, tab: value } });
  };

  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="GHG Inventory Improvement Programme" />
        <TabSwitcher
          tabs={this.state.tabs}
          searchFilter={this.props.searchFilter}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={this.props.activeTabValue}
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
