import React, { PureComponent } from 'react';
import NDCImage from 'assets/south-africa-ndc/ndc@2x.jpg';
import SectionTitle from 'components/section-title';
import { Button } from 'cw-components';
import button from 'styles/themes/button';
import cx from 'classnames';
import styles from './ndc-pledge-styles.scss';

class NDCPledge extends PureComponent {
  render() {
    return (
      <div className={styles.ndcContainer}>
        <div
          style={{
            backgroundImage: `url(${NDCImage})`,
            backgroundSize: '100%'
          }}
          className={styles.ndcImage}
        />
        <div className={styles.ndcTextContainer}>
          <SectionTitle
            isSubtitle
            className={styles.ndcTitle}
            title="South Africa National Determined Contribution (NDC) pledge and ambition"
          />
          <p className={styles.ndcDescription}>
            South Africa’s emissions by 2025 and 2030 will be in a range between 398 and 614 Mt CO2–eq, as defined in national policy.
          </p>
          <p className={styles.ndcDescription}>
            The adaptation component of South Africa’s INDC will address adaptation through six goals, underpinned by key elements of adaptation planning, costing of adaptation investment requirements, equity, and means of implementation.
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
