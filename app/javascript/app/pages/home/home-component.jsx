import React, { PureComponent } from 'react';
import { Section } from 'cw-components';
import background from 'assets/hero';
import TotalGHGEmissions from 'components/home/total-ghg-emissions';
import FlagshipProgrammes from 'components/home/flagship-programmes';
import Cards from 'components/home/cards';
import styles from './home-styles.scss';

class Home extends PureComponent {
  render() {
    return (
      <div className={styles.page}>
        <Section backgroundImage={background} theme={styles}>
          <div className="layout-container">
            <div className={styles.introTextContainer}>
              <p className={styles.introText}>
                The South African Climate Report captures South Africa’s response to climate change with emphasis on climate change mitigation, and offers open data, visualizations and analysis to help policy-makers, researchers, investors and the general public gather insights on the country’s climate progress.
              </p>
            </div>
          </div>
          <div className="layout-container">
            <Cards />
          </div>
        </Section>
        <TotalGHGEmissions />
        <FlagshipProgrammes />
      </div>
    );
  }
}
export default Home;
