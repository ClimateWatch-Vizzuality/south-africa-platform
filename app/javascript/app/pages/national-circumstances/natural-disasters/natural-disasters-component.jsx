import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'cw-components';
import SectionTitle from 'components/section-title';
import NaturalDisastersDataProvider from 'providers/natural-disasters-data-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import styles from './natural-disasters-styles.scss';

function createMarkup(description) {
  return { __html: description };
}

class NaturalDisasters extends PureComponent {
  render() {
    const { naturalDisastersData, title, description } = this.props;
    return (
      <div className={styles.sectionWrapper}>
        <div className={styles.titleContainer}>
          <SectionTitle isSubtitle title={title} />
          <div className={styles.buttonWrapper}>
            <InfoDownloadToolbox
              slugs="COGTA2015"
              downloadUri="national_circumstance/priorities.zip?sources=COGTA2015"
            />
          </div>
        </div>
        <p
          className={styles.sectionDescription}
          dangerouslySetInnerHTML={{ __html: description }}
        />
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

NaturalDisasters.propTypes = {
  naturalDisastersData: PropTypes.array,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
NaturalDisasters.defaultProps = { naturalDisastersData: [] };

export default NaturalDisasters;
