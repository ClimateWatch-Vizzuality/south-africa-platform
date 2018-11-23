import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { Stories, Button } from 'cw-components';
import SectionTitle from 'components/section-title';
import button from 'styles/themes/button';
import cx from 'classnames';
import styles from './flagship-programmes-styles.scss';
import { flagshipProgrammes } from './flagship-programmes-map';

class FlagshipProgrammes extends PureComponent {
  render() {
    const { title, description } = this.props;
    return (
      <div className={styles.flagshipContainer}>
        <div className="layout-container">
          <div className={styles.titleContainer}>
            <SectionTitle
              title={title}
              theme={{ sectionTitle: styles.flagshipProgrammesTitle }}
            />
            <div className={styles.buttonContainer}>
              <Button
                link={
                  (
                    <Link
                      to="/mitigation/flagship-programmes"
                      onTouchStart={null}
                      onMouseDown={null}
                    />
                  )
                }
                theme={{
                  button: cx(button.primary, styles.flagshipProgrammesButton)
                }}
              >
                View all programmes
              </Button>
            </div>
          </div>
        </div>
        <p className={styles.description}>
          {description}
        </p>
        <Stories stories={flagshipProgrammes} theme={styles} />
      </div>
    );
  }
}

FlagshipProgrammes.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

FlagshipProgrammes.defaultProps = { title: null, description: null };

export default FlagshipProgrammes;
