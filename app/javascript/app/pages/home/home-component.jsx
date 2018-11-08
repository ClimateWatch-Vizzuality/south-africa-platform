import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Section } from 'cw-components';
import background from 'assets/hero';
import NDCPledge from 'components/home/ndc-pledge';
import TotalGHGEmissions from 'components/home/total-ghg-emissions';
import HomeFlagshipProgrammes from 'components/home/flagship-programmes';
import SectionsContentProvider from 'providers/sections-content-provider';

import styles from './home-styles.scss';

class Home extends PureComponent {
  render() {
    const { introText } = this.props;

    return (
      <div className={styles.page}>
        <Section backgroundImage={background} theme={styles}>
          <div className={styles.verticalCenterText}>
            <div className={styles.introTextContainer}>
              <p
                className={styles.introText}
                dangerouslySetInnerHTML={{ __html: introText }}
              />
            </div>
          </div>
        </Section>
        <NDCPledge />
        <TotalGHGEmissions />
        <HomeFlagshipProgrammes />
        <SectionsContentProvider />
      </div>
    );
  }
}

Home.propTypes = { introText: PropTypes.string.isRequired };

export default Home;
