import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import FlagshipButtons from 'components/flagship-buttons';
import { PropTypes } from 'prop-types';
import { Button } from 'cw-components';
import Link from 'redux-first-router-link';
import button from 'styles/themes/button';
import kebabCase from 'lodash/kebabCase';

import styles from './prioritised-flagship-programmes-styles.scss';

class PrioritisedFlagshipProgrammes extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({
      query: { ...query, id: value },
      section: 'flagship-programmes'
    });
  };

  render() {
    const { selectedSection } = this.props;
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
              <FlagshipButtons
                from={0}
                to={4}
                handleFilterChange={this.handleFilterChange}
              />
            </div>
            <div className={styles.itemDescription}>
              <div className={styles.subProgrammes}>
                <div className={styles.subProgrammesTitle}>
                  Sub-Programmes implemented:
                </div>
                <ul className={styles.subProgrammesList}>
                  {
                    selectedSection &&
                      selectedSection.subPrograms.map(subProgram => (
                        <li key={subProgram}>
                          {subProgram}
                        </li>
                      ))
                  }
                </ul>
              </div>
              <Button
                theme={{ button: button.primary }}
                link={
                  (
                    <Link
                      to={
                        `/mitigation/flagship-programmes/${selectedSection &&
                          kebabCase(selectedSection.name)}`
                      }
                      onTouchStart={undefined}
                      onMouseDown={undefined}
                    />
                  )
                }
              >
                Learn more
              </Button>
            </div>
            <div className={styles.itemsList}>
              <FlagshipButtons
                from={4}
                to={8}
                handleFilterChange={this.handleFilterChange}
              />
            </div>
          </div>
        </div>
        <FlagshipProgrammesProvider />
      </div>
    );
  }
}

PrioritisedFlagshipProgrammes.propTypes = {
  selectedSection: PropTypes.object,
  updateQueryParam: PropTypes.func.isRequired,
  query: PropTypes.object
};

PrioritisedFlagshipProgrammes.defaultProps = {
  selectedSection: null,
  query: {}
};

export default PrioritisedFlagshipProgrammes;
