import React, { PureComponent } from 'react';
import NDCImage from 'assets/south-africa-ndc/ndc.png';
import NDCImageRetina from 'assets/south-africa-ndc/ndc@2x.png';
import SectionTitle from 'components/section-title';
import { Section, Button } from 'cw-components';
import button from 'styles/themes/button';
import cx from 'classnames';
import styles from './ndc-pledge-styles.scss';

class NDCPledge extends PureComponent {
  render() {
    return (
      <Section theme={styles}>
        <div className={styles.ndcContainer}>
          <img
            srcSet={`${NDCImage} 1x, ${NDCImageRetina} 2x`}
            src={NDCImage}
            alt="South Africa NDC"
            className={styles.ndcImage}
          />
          <div className={styles.ndcTextContainer}>
            <SectionTitle
              isSubtitle
              className={styles.ndcTitle}
              title="South Africa National Determined Contribution (NDC) pledge and ambition"
            />
            <p className={styles.ndcDescription}>
              South Africa’s emissions will range within 398 to 614 Mt CO2–eq,
              by 2025 and 2030, as defined in the National Climate Change
              Response Policy.
            </p>
            <p className={styles.ndcDescription}>
              Adaptation is addressed through six goals: A National Adaptation
              Plan; consideration, integration of adaptation investment needs
              and, institutional capacity building into policy, planning and
              implementation processes; vulnerability assessment and
              adaptation needs framework; early warning, vulnerability and
              adaptation monitoring system and communication of investments in
              adaptation.
            </p>
            <Button /* onClick={handleNDCPledgeClick} */
              theme={{ button: cx(button.white, styles.learnMoreButton) }}
              disabled
            >
              Learn More
            </Button>
          </div>
        </div>
      </Section>
    );
  }
}
NDCPledge.propTypes = {};
export default NDCPledge;
