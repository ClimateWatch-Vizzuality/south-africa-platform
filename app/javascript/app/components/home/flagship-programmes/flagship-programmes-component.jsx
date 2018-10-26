import React, { PureComponent } from 'react';
import { Stories, Button } from 'cw-components';
import SectionTitle from 'components/section-title';
import button from 'styles/themes/button';
import cx from 'classnames';
import styles from './flagship-programmes-styles.scss';
import { flagshipProgrammes } from './flagship-programmes-map';

class FlagshipProgrammes extends PureComponent {
  render() {
    return (
      <div className={styles.flagshipContainer}>
        <div className="layout-container">
          <div className={styles.titleContainer}>
            <SectionTitle
              title="Flagship Programmes"
              theme={{ sectionTitle: styles.flagshipProgrammesTitle }}
            />
            <div className={styles.buttonContainer}>
              <Button
                /* onClick={handleFlagshipProgrammesClick} */
                disabled
                theme={{
                  button: cx(button.primary, styles.flagshipProgrammesButton)
                }}
              >
                View all programmes
              </Button>
            </div>
          </div>
        </div>
        <p className={styles.description}>
          The Climate Change Flagship Programmes are strategic measures implemented by the South African government to trigger a large-scale transition to a low-carbon economy and create a more climate-resilient South Africa. They signal climate change investment priorities and provide the certainty needed to stimulate further investment.
        </p>
        <Stories stories={flagshipProgrammes} theme={styles} />
      </div>
    );
  }
}

export default FlagshipProgrammes;
