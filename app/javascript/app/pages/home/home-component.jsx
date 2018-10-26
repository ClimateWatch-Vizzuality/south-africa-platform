import React, { PureComponent } from 'react';
import { Section } from 'cw-components';
import background from 'assets/hero';
import NDCPledge from 'components/home/ndc-pledge';
import TotalGHGEmissions from 'components/home/total-ghg-emissions';
import HomeFlagshipProgrammes from 'components/home/flagship-programmes';

import styles from './home-styles.scss';

class Home extends PureComponent {
  render() {
    return (
      <div className={styles.page}>
        <Section backgroundImage={background} theme={styles}>
          <div className={styles.verticalCenterText}>
            <div className={styles.introTextContainer}>
              <p className={styles.introText}>
                The{' '}
                <span className={styles.bold}>
                  South Africa’s Biennial Update Report
                </span>
                {' '}
                offers open data, visualizations and analysis to help you gather insights on South Africa’s climate progress.
              </p>
            </div>
          </div>
        </Section>
        <NDCPledge />
        <TotalGHGEmissions />
        <HomeFlagshipProgrammes />
      </div>
    );
  }
}
export default Home;
