import React, { PureComponent } from 'react';
import MitigationEffectsProvider from 'providers/mitigation-effects-provider';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Loading } from 'cw-components';
import Summary from './summary';

import styles from './mitigation-effects-styles';

const SUMMARY_KEY = 'summary';
const SUSTAINABLE_DEVELOPMENT_KEY = 'sustainable-development';

class MitigationEffects extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { name: 'SUMMARY', value: SUMMARY_KEY, component: <Summary /> },
        {
          name: 'SUSTAINABLE DEVELOPMENT BENEFITS',
          value: SUSTAINABLE_DEVELOPMENT_KEY,
          component: <Loading height="660" />,
          disabled: true
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
        />
        <MitigationEffectsProvider />
      </div>
    );
  }
}

MitigationEffects.propTypes = {};

export default MitigationEffects;
