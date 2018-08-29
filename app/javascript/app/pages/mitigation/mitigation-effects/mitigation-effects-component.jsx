import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Loading } from 'cw-components';

import styles from './mitigation-effects-styles';

const SUMMARY_KEY = 'summary';
const SUSTAINABLE_DEVELOPMENT_KEY = 'sustainable-development';

class MitigationEffects extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: 'SUMMARY',
          value: SUMMARY_KEY,
          component: <Loading height="660" />
        },
        {
          name: 'SUSTAINABLE DEVELOPMENT BENEFITS',
          value: SUSTAINABLE_DEVELOPMENT_KEY,
          component: <Loading height="660" />
        }
      ]
    };
  }

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="Mitigation Effects" />
        <TabSwitcher
          tabs={this.state.tabs}
          searchActive={false}
          actionsActive={false}
          onTabChange={() => {
          }}
          /* activeTabValue={this.props.activeTabValue} */
        />
      </div>
    );
  }
}

MitigationEffects.propTypes = {};

export default MitigationEffects;
