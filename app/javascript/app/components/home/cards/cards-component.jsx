import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'cw-components';
import OverviewCountryInfoProvider from 'providers/overview-country-info-provider';
import styles from './cards-styles.scss';

function createMarkup(description) {
  return { __html: description };
}

class Cards extends PureComponent {
  render() {
    const { cardsData } = this.props;
    return (
      <div className={styles.cardsContainer}>
        {
          cardsData && cardsData.map(card => (
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
        <OverviewCountryInfoProvider />
      </div>
    );
  }
}
Cards.propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, description: PropTypes.string })
  )
};

Cards.defaultProps = { cardsData: [] };

export default Cards;
