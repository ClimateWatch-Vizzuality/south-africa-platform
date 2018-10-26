import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import { Button } from 'cw-components';
import button from 'styles/themes/button';
import cx from 'classnames';
import styles from './ndc-pledge-styles.scss';

class NDCPledge extends PureComponent {
  render() {
    return (
      <div className={styles.ndcContainer}>
        <div className={styles.ndcImage} />
        <div className={styles.ndcTextContainer}>
          <SectionTitle
            isSubtitle
            className={styles.ndcTitle}
            title="South Africa National Determined Contribution (NDC) pledge and ambition"
          />
          <p className={styles.ndcDescription}>
            Under South Africa’s NDC,  GHG emissions will peak between 2020 and 2025, plateau for approximately a decade, landing in the range of 398-614 MtCO2eq as defined by national policy, and decline in absolute terms thereafter.
          </p>
          <p className={styles.ndcDescription}>
            The adaptation component of South Africa’s NDC will address adaptation through six goals, underpinned by key elements of adaptation planning, pricing of adaptation investment requirements, equity, and means of implementation.
          </p>
          <Button /* onClick={handleNDCPledgeClick} */
            theme={{ button: cx(button.white, styles.learnMoreButton) }}
            disabled
          >
            Learn More
          </Button>
        </div>
      </div>
    );
  }
}
NDCPledge.propTypes = {};
export default NDCPledge;
