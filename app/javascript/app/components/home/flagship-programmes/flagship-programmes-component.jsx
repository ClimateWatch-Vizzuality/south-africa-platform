import React, { PureComponent } from 'react';
import { Stories } from 'cw-components';
import SectionTitle from 'components/section-title';

import styles from './flagship-programmes-styles.scss';
import { flagshipProgrammes } from './flagship-programmes-map';

class FlagshipProgrammes extends PureComponent {
  render() {
    return (
      <div className={styles.flagshipContainer}>
        <SectionTitle
          title="Flagship Programmes"
          theme={{ sectionTitle: styles.flagshipProgrammesTitle }}
        />
        <Stories stories={flagshipProgrammes} theme={styles} />
      </div>
    );
  }
}

export default FlagshipProgrammes;
