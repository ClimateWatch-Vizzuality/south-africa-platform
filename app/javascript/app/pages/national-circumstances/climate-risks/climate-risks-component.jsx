import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'cw-components';
import SectionTitle from 'components/section-title';
import ClimateRisksDataProvider from 'providers/climate-risks-data-provider';
import styles from './climate-risks-styles.scss';

function createMarkup(description) {
  return { __html: description };
}

class ClimateRisks extends PureComponent {
  render() {
    const { climateRisksData } = this.props;
    return (
      <div className={styles.sectionWrapper}>
        <SectionTitle title="Climate Risks" />
        <div className={styles.cardsContainer}>
          {
            climateRisksData && climateRisksData.map(card => (
              <div key={card.title} className={styles.cardElement}>
                <Card title={card.title} theme={styles}>
                  <div
                    className={styles.cardContent}
                    dangerouslySetInnerHTML={createMarkup(card.description)}
                  />
                </Card>
              </div>
              ))
          }
        </div>
        <ClimateRisksDataProvider />
      </div>
    );
  }
}

ClimateRisks.propTypes = { climateRisksData: PropTypes.array };

ClimateRisks.defaultProps = { climateRisksData: [] };

export default ClimateRisks;
