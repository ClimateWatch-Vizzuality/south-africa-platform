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
          <div className="layout-container">
            <div className={styles.introTextContainer}>
              <p className={styles.introText}>
                The South African Climate Change Response Explorer is an
                important part of the National Climate Change Monitoring and
                Evaluation (M&ampersand;E) System established as part of the national
                efforts to track South Africa’s overall transition to a low
                carbon and climate resilient society and economy.  The purpose
                of the Explorer is to help policy-makers, researchers,
                investors, and the general public gather insights into the
                status of South Africa
                {"'"}
                s climate change response; offering
                open data, visualization and analysis of different aspects of
                the national response.  The platform is currently based
                primarily on data from South Africa
                {"'"}
                s Biennial Update Report
                and Third National Communication under the United Nations
                Framework Convention on Climate Change, but will, in the futur
                , incorporate a greater range of climate change M&ampersand;E indicators
                and sources of information.
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
