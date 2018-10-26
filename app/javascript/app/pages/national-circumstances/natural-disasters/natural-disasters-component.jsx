import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'cw-components';
import SectionTitle from 'components/section-title';
import NaturalDisastersDataProvider from 'providers/natural-disasters-data-provider';
import ModalInfo from 'components/modal-info';
import styles from './natural-disasters-styles.scss';

function createMarkup(description) {
  return { __html: description };
}

class NaturalDisasters extends PureComponent {
  render() {
    const { naturalDisastersData } = this.props;
    return (
      <div className={styles.sectionWrapper}>
        <SectionTitle isSubtitle title="Natural Disasters" infoButton />
        <ModalInfo title="Natural Disasters">
          South Africa is exposed to natural disasters including drought, floods and wildfires. Economic losses from weather-related disasters have increased in recent years.
        </ModalInfo>
        <div className={styles.cardsContainer}>
          {
            naturalDisastersData && naturalDisastersData.map(card => (
              <div key={card.description} className={styles.cardElement}>
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
        <NaturalDisastersDataProvider />
      </div>
    );
  }
}

NaturalDisasters.propTypes = { naturalDisastersData: PropTypes.array };
NaturalDisasters.defaultProps = { naturalDisastersData: [] };

export default NaturalDisasters;
