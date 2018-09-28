import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import { PropTypes } from 'prop-types';
import { Button } from 'cw-components';
import button from 'styles/themes/button';
import flagship1 from 'assets/flagship-programmes/1.png';
import flagship2 from 'assets/flagship-programmes/2.png';
import flagship3 from 'assets/flagship-programmes/3.png';
import flagship4 from 'assets/flagship-programmes/4.png';
import flagship5 from 'assets/flagship-programmes/5.png';
import flagship6 from 'assets/flagship-programmes/6.png';
import flagship7 from 'assets/flagship-programmes/7.png';
import flagship8 from 'assets/flagship-programmes/8.png';
import FlagshipButton from './flagship-button/flagship-button';
import styles from './prioritised-flagship-programmes-styles.scss';

class PrioritisedFlagshipProgrammes extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({
      query: { ...query, flagshipId: value },
      section: 'flagship-programmes'
    });
  };

  renderButton(s) {
    const { selectedId } = this.props;
    const flagshipImages = {
      flagship1,
      flagship2,
      flagship3,
      flagship4,
      flagship5,
      flagship6,
      flagship7,
      flagship8
    };
    return (
      <FlagshipButton
        key={s.name}
        flagshipImages={flagshipImages}
        section={s}
        onClick={() => this.handleFilterChange(s.position)}
        active={selectedId === s.position}
      />
    );
  }

  renderButtons(from, to) {
    const { sections } = this.props;
    return sections &&
      sections.length &&
      sections.slice(from, to).map(s => this.renderButton(s));
  }

  render() {
    return (
      <div className={styles.prioritisedFlagshipProgrammes}>
        <SectionTitle
          isSubtitle
          title="Prioritised Climate Change Flagship Programmes to 2030"
          className={styles.title}
        />
        <div className={styles.prioritisedItemsContainer}>
          <div className={styles.prioritisedItems}>
            <div className={styles.itemsList}>
              {this.renderButtons(0, 4)}
            </div>
            <div className={styles.itemDescription}>
              <div className={styles.subProgrammes}>
                <div className={styles.subProgrammesTitle}>
                  Sub-Programmes implemented:
                </div>
              </div>
              <Button
                onClick={this.handleDownloadClick}
                theme={{ button: button.primary }}
              >
                Learn More
              </Button>
            </div>
            <div className={styles.itemsList}>
              {this.renderButtons(4, 8)}
            </div>
          </div>
        </div>
        <FlagshipProgrammesProvider />
      </div>
    );
  }
}

PrioritisedFlagshipProgrammes.propTypes = {
  sections: PropTypes.array,
  updateQueryParam: PropTypes.func.isRequired,
  query: PropTypes.object,
  selectedId: PropTypes.string
};

PrioritisedFlagshipProgrammes.defaultProps = {
  sections: [],
  query: {},
  selectedId: null
};

export default PrioritisedFlagshipProgrammes;
