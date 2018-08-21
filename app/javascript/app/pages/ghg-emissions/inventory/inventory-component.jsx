import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import GHGInventoryProvider from 'providers/ghg-inventory-provider';
import { Loading, Table } from 'cw-components';

import styles from './inventory-styles.scss';

const COMPLETE_KEY = 'completeProjects';
const UNDER_IMPLEMENTATION_KEY = 'underImplementation';

class GHGInventory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: 'COMPLETED PROJECTS',
          value: COMPLETE_KEY,
          component: <Loading />
        },
        {
          name: 'UNDER IMPLEMENTATION',
          value: UNDER_IMPLEMENTATION_KEY,
          component: <Loading />
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
            return {
              ...tab,
              component: (
                <Table hasColumnSelect horizontalScroll {...props.tableData} />
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
    this.props.updateTabActive({ section: 'inventory', query: { tab: value } });
  };

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="GHG Inventory Improvement Programme" />
        <TabSwitcher
          onTabChange={this.handleTabChange}
          tabs={this.state.tabs}
          activeTabValue={this.props.activeTabValue}
        />
        <GHGInventoryProvider />
      </div>
    );
  }
}

GHGInventory.propTypes = {
  tableData: PropTypes.shape({
    data: PropTypes.array,
    defaultColumns: PropTypes.array,
    ellipsisColumns: PropTypes.array
  }),
  activeTabValue: PropTypes.string.isRequired,
  updateTabActive: PropTypes.func.isRequired
};

GHGInventory.defaultProps = { tableData: {} };

export default GHGInventory;
