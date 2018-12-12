import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import NationalCircumstancesPrioritiesProvider from 'providers/national-circumstances-priorities-provider';

import ProvincialContent from './provincial-development-priorities-content';
import styles from './provincial-styles.scss';

const MITIGATION_KEY = 'mitigation';
const ADAPTATION_KEY = 'adaptation';

class Provincial extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, tab: value } });
  };

  renderTabs() {
    const { selectedData } = this.props;
    const component = (
      <ProvincialContent title="Western Cape" selectedData={selectedData} />
    );
    return [
      { name: 'Mitigation', value: MITIGATION_KEY, component },
      { name: 'Adaptation', value: ADAPTATION_KEY, component }
    ];
  }

  render() {
    const { activeTabValue, title, description } = this.props;
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title={title} description={description} />
        <TabSwitcher
          tabs={this.renderTabs()}
          searchActive={false}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
          slugs="BUR2"
          downloadUri="national_circumstance/priorities.zip?sources=BUR2"
        />
        <NationalCircumstancesPrioritiesProvider />
      </div>
    );
  }
}
Provincial.propTypes = {
  query: PropTypes.object,
  selectedData: PropTypes.object,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
Provincial.defaultProps = {
  query: null,
  activeTabValue: null,
  selectedData: {}
};
export default Provincial;
