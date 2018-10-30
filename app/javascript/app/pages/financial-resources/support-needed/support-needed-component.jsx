import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import DataTable from 'components/data-table';
import FinancialResourcesNeededProvider from 'providers/financial-resources-needed-provider';
import ModalInfo from 'components/modal-info';
import styles from './support-needed-styles.scss';

const FINANCIAL_SUPPORT_NEEDED_KEY = 'financialSupportNeeded';
const NON_MONETIZED_NEEDS = 'nonMonetizedNeeds';

class SupportNeeded extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query, section } = this.props;
    updateQueryParam({ query: { ...query, tab: value }, section });
  };

  handleFilterChange = value => {
    const { updateQueryParam, query, section } = this.props;
    updateQueryParam({ query: { ...query, search: value }, section });
  };

  renderTabs() {
    const { tableData, searchFilter } = this.props;
    const columnWidth = 250;
    const component = (
      <DataTable
        tableData={tableData}
        searchFilter={searchFilter}
        setColumnWidth={() => columnWidth}
      />
    );
    return [
      {
        name: 'FINANCIAL SUPPORT NEEDED',
        value: FINANCIAL_SUPPORT_NEEDED_KEY,
        component
      },
      { name: 'NON MONETIZED NEEDS', value: NON_MONETIZED_NEEDS, component }
    ];
  }

  render() {
    const { searchFilter, activeTabValue } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title="Support Needed" infoButton />
        <ModalInfo title="Support Needed">
          This section includes a summary of support needed for climate change mitigation and adaptation actions.
        </ModalInfo>
        <TabSwitcher
          tabs={this.renderTabs()}
          searchFilter={searchFilter}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
          slugs="BUR2"
          downloadUri="financial_resource/support_needs"
        />
        <FinancialResourcesNeededProvider />
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
