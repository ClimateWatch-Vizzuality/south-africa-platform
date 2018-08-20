import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';

import styles from './inventory-styles.scss';

const COMPLETE_KEY = 'completeProjects';
const UNDER_IMPLEMENTATION_KEY = 'underImplementation';

class GHGInventory extends PureComponent {
  tabs = [
    {
      name: 'COMPLETED PROJECTS',
      value: COMPLETE_KEY,
      component: <p>My complete component</p>
    },
    {
      name: 'UNDER IMPLEMENTATION',
      value: UNDER_IMPLEMENTATION_KEY,
      component: <p>My under implementation component</p>
    }
  ];

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="GHG Inventory Improvement Programme" />
        <TabSwitcher tabs={this.tabs} activeTabValue={COMPLETE_KEY} />
      </div>
    );
  }
}

GHGInventory.propTypes = {};

GHGInventory.defaultProps = {};

export default GHGInventory;
