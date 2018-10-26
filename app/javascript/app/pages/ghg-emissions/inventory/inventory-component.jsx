import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import GHGInventoryProvider from 'providers/ghg-inventory-provider';
import downloadIcon from 'assets/icons/download';
import { Button, Icon } from 'cw-components';
import DataTable from 'components/data-table';
import button from 'styles/themes/button';
import { GHG_NATIONAL_REPORT } from 'constants/links';
import styles from './inventory-styles.scss';

class GHGInventory extends PureComponent {
  handleDownloadClick = () => {
    window.open(GHG_NATIONAL_REPORT, '_blank');
  };

  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({
      section: 'inventory',
      query: { ...query, search: value }
    });
  };

  renderTabs() {
    const { tableData, searchFilter } = this.props;
    return [
      {
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
        <div className="layout-container">
          <div className={styles.titleContainer}>
            <SectionTitle
              isSubtitle
              title="GHG Inventory Improvement Programme"
            />
            <div className={styles.actionContainer}>
              <div className={styles.downloadDescription}>
                Download a full Inventory Report
              </div>
              <Button
                onClick={this.handleDownloadClick}
                theme={{ button: cx(button.primary, styles.downloadButton) }}
              >
                GHG NIR
                <Icon icon={downloadIcon} theme={{ icon: styles.icon }} />
              </Button>
            </div>
          </div>
        </div>
        <TabSwitcher
          tabs={this.renderTabs()}
          searchFilter={searchFilter}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
          downloadUri="inventory_improvement_projects"
          slugs="+++inventory"
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
