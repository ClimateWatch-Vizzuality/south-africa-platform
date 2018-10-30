import React, { PureComponent } from 'react';
import MitigationEffectsProvider from 'providers/mitigation-effects-provider';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import DataTable from 'components/data-table';
import ModalInfo from 'components/modal-info';
import { PropTypes } from 'prop-types';
import Summary from './summary';
import styles from './mitigation-effects-styles';

const SUMMARY_KEY = 'summary';
const SUSTAINABLE_DEVELOPMENT_KEY = 'sustainable-development';

class MitigationEffects extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, section } = this.props;
    updateQueryParam({ query: { tab: value }, section });
  };

  renderTabs() {
    const { tableData } = this.props;
    return [
      { name: 'SUMMARY', value: SUMMARY_KEY, component: <Summary /> },
      {
        name: 'SUSTAINABLE DEVELOPMENT BENEFITS',
        value: SUSTAINABLE_DEVELOPMENT_KEY,
        component: tableData &&
          (
            <DataTable
              tableData={tableData}
              dynamicRowsHeight
              setColumnWidth={() => 150}
            />
          )
      }
    ];
  }

  render() {
    const { activeTabValue } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title="Mitigation Effects" infoButton />
        <ModalInfo title="Mitigation Effects">
          Through the National Climate Change Response Monitoring and Evaluation System (M&E System), South Africa is continuously striving to quantify the effects of mitigation policies, strategies and actions. This section presents the mitigation actions for which mitigation effects and sustainable development co-benefits have been quantified.
        </ModalInfo>
        <TabSwitcher
          tabs={this.renderTabs()}
          searchActive={false}
          actionsActive={false}
          activeTabValue={activeTabValue}
          onTabChange={this.handleTabChange}
        />
        <MitigationEffectsProvider />
      </div>
    );
  }
}

MitigationEffects.propTypes = {
  tableData: PropTypes.object,
  updateQueryParam: PropTypes.func.isRequired,
  section: PropTypes.string,
  activeTabValue: PropTypes.string
};

MitigationEffects.defaultProps = {
  tableData: {},
  activeTabValue: 'summary',
  section: 'mitigation-effects'
};

export default MitigationEffects;
