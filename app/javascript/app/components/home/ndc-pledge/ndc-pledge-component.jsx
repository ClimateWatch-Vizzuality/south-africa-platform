import React, { PureComponent } from 'react';
import NDCImage from 'assets/south-africa-ndc/ndc.png';
import NDCImageRetina from 'assets/south-africa-ndc/ndc@2x.png';
import SectionTitle from 'components/section-title';
import { Section, Button } from 'cw-components';
import button from 'styles/themes/button';
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
              title="South Africa National Determined Contribution (NDC) pledge and ambition"
            />
            <p className={styles.ndcDescription}>
              South Africa’s emissions by 2025 and 2030 will be in a range between 398 and 614 Mt CO2–eq, as defined in national policy.
            </p>
            <p className={styles.ndcDescription}>
              The adaptation component of South Africa’s INDC will address adaptation through six goals, underpinned by key elements of adaptation planning, costing of adaptation investment requirements, equity, and means of implementation.
            </p>
            <Button /* onClick={handleNDCPledgeClick} */
              theme={{ button: button.white }}
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
