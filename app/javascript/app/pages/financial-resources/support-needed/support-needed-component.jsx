import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Loading } from 'cw-components';

import styles from './support-needed-styles.scss';

const FINANCIAL_SUPPORT_NEEDED_KEY = 'financialSupportNeeded';
const NON_MONETIZED_NEEDS = 'nonMonetizedNeeds';

class SupportNeeded extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: 'FINANCIAL SUPPORT NEEDED',
          value: FINANCIAL_SUPPORT_NEEDED_KEY,
          component: <Loading height="660" />
        },
        {
          name: 'NON MONETIZED NEEDS',
          value: NON_MONETIZED_NEEDS,
          component: <Loading height="660" />,
          disabled: true
        }
      ]
    };
  }

  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, tab: value } });
  };

  render() {
    const { searchFilter, activeTabValue } = this.props;
    const { tabs } = this.state;
    return (
      <div className={styles.row}>
        <SectionTitle title="Support Needed" />
        <TabSwitcher
          tabs={tabs}
          searchFilter={searchFilter}
          onTabChange={this.handleTabChange}
          activeTabValue={activeTabValue}
        />
      </div>
    );
  }
}

SupportNeeded.propTypes = {
  query: PropTypes.object,
  searchFilter: PropTypes.string,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

SupportNeeded.defaultProps = {
  searchFilter: '',
  query: null,
  activeTabValue: null
};

export default SupportNeeded;
