import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import MitigationActionsProvider from 'providers/mitigation-actions-provider';
import DataTable from 'components/data-table';
import ModalInfo from 'components/modal-info';
import styles from './mitigation-actions-styles.scss';

const ALL_ACTIONS_KEY = 'allActions';
const WITH_QUANTIFIED_EFFECTS_KEY = 'quantifiedEffects';
const WITHOUT_QUANTIFIED_EFFECTS_KEY = 'withoutQuantifiedEffects';

class MitigationActions extends PureComponent {
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
    const component = (
      <DataTable tableData={tableData} searchFilter={searchFilter} />
    );
    return [
      { name: 'ALL ACTIONS', value: ALL_ACTIONS_KEY, component },
      {
        name: 'WITH QUANTIFIED EFFECTS',
        value: WITH_QUANTIFIED_EFFECTS_KEY,
        component
      },
      {
        name: 'WITHOUT QUANTIFIED EFFECTS',
        value: WITHOUT_QUANTIFIED_EFFECTS_KEY,
        component
      }
    ];
  }

  render() {
    const { searchFilter, activeTabValue, title } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title={title} infoButton />
        <ModalInfo title={title}>
          <p>
            South Africa’s national government will implement a mix of policies and measures over five-year periods. The 2016 and 2020 phase will focus demonstrating policies to meet South Africa’s Cancun pledge. The 2021-2025 and 2026-2030 phases will focus on achieving the pledges made in South Africa’s NDC.
          </p>
          <p>
            Policy instruments to aid in achieving this are under development and include a carbon tax, sectoral emission targets (SETs) for sectors, company-level carbon budgets, regulatory standards and controls for specifically identified GHG pollutants and emitters, and continued implementation of the Climate Change Flagship Programmes.
          </p>
          <p>
            Key mitigation actions being implemented by national, provincial and municipal level governments, the, private sector and non-profit organisations in South Africa are discussed below.
          </p>
        </ModalInfo>
        <TabSwitcher
          tabs={this.renderTabs()}
          searchFilter={searchFilter}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
          downloadUri="mitigation/mitigation_actions"
          slugs="BUR2"
        />
        <MitigationActionsProvider />
      </div>
    );
  }
}
MitigationActions.propTypes = {
  query: PropTypes.object,
  searchFilter: PropTypes.string,
  tableData: PropTypes.shape({
    data: PropTypes.array,
    defaultColumns: PropTypes.array,
    ellipsisColumns: PropTypes.array
  }),
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
MitigationActions.defaultProps = {
  searchFilter: '',
  query: null,
  tableData: {},
  activeTabValue: null
};
export default MitigationActions;
