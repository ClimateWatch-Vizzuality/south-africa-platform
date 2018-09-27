import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import styles from './prioritised-flagship-programmes-styles.scss';

class PrioritisedFlagshipProgrammes extends PureComponent {
  render() {
    return (
      <div className={styles.prioritisedFlagshipProgrammes}>
        <SectionTitle
          isSubtitle
          title="Prioritised Climate Change Flagship Programmes to 2030"
          className={styles.title}
        />
        <div className={styles.prioritisedItemsContainer}>
          <div className={styles.itemsLeft}>
            links
          </div>
          <div className={styles.itemDescription}>
            description
          </div>
          <div className={styles.itemsRight}>
            links
          </div>
        </div>
        <FlagshipProgrammesProvider />
      </div>
    );
  }
}
export default PrioritisedFlagshipProgrammes;
