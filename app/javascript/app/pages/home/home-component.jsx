import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Section, Card } from 'cw-components';
import background from 'assets/hero';
import TotalGHGEmissions from 'components/total-ghg-emissions';
import styles from './home-styles.scss';

class Home extends PureComponent {
  render() {
    const { cardsData } = this.props;
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
            <div className={styles.cardsContainer}>
              {
                cardsData && cardsData.map(card => (
                  <div className={styles.cardElement}>
                    <Card title={card.title} theme={styles}>
                      <div className={styles.cardContent}>
                        {card.description}
                      </div>
                    </Card>
                  </div>
                  ))
              }
            </div>
          </div>
        </Section>
        <TotalGHGEmissions />
      </div>
    );
  }
}
Home.propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, description: PropTypes.string })
  ).isRequired
};
export default Home;
