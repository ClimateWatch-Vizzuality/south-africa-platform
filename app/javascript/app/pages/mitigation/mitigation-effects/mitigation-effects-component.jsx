import React, { PureComponent } from 'react';
import MitigationEffectsProvider from 'providers/mitigation-effects-provider';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Loading } from 'cw-components';
import ModalInfo from 'components/modal-info';
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
    const { tabs } = this.state;
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title="Mitigation Effects" infoButton />
        <ModalInfo title="Mitigation Effects">
          Through the National Climate Change Response Monitoring and Evaluation System (M&E System), South Africa is continuously striving to quantify the effects of mitigation policies, strategies and actions. This section presents the mitigation actions for which mitigation effects and sustainable development co-benefits have been quantified.
        </ModalInfo>
        <TabSwitcher
          tabs={tabs}
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
