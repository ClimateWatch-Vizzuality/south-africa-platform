import React, { PureComponent } from 'react';
import MitigationEffectsProvider from 'providers/mitigation-effects-provider';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
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

  // eslint-disable-next-line
  renderTabs() {
    return [
      { name: 'SUMMARY', value: SUMMARY_KEY, component: <Summary /> },
      {
        name: 'SUSTAINABLE DEVELOPMENT BENEFITS',
        value: SUSTAINABLE_DEVELOPMENT_KEY,
        component: null,
        disabled: true
      }
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
  updateQueryParam: PropTypes.func.isRequired,
  section: PropTypes.string,
  activeTabValue: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

MitigationEffects.defaultProps = {
  activeTabValue: 'summary',
  section: 'mitigation-effects'
};

export default MitigationEffects;
