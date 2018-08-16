import React, { PureComponent } from 'react';
import { Stories } from 'cw-components';

import styles from './flagship-programmes-styles.scss';
import { flagshipProgrammes } from './flagship-programmes-map';

class FlagshipProgrammes extends PureComponent {
  render() {
    return (
      <div className={styles.flagshipContainer}>
        <div className={styles.flagshipProgrammesTitle}>
          Flagship Programmes
        </div>
        <Stories stories={flagshipProgrammes} theme={styles} />
      </div>
    );
  }
}

export default FlagshipProgrammes;
