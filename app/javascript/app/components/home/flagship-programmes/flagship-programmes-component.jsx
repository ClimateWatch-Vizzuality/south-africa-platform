import React, { PureComponent } from 'react';
import { Stories } from 'cw-components';

import styles from './flagship-programmes-styles.scss';
import { flagshipProgrammes } from './flagship-programmes-map';

class FlagshipProgrammes extends PureComponent {
  render() {
    return (
      <Stories
        stories={flagshipProgrammes}
        storiesTitle="Flagship Programmes"
        theme={styles}
      />
    );
  }
}

export default FlagshipProgrammes;
