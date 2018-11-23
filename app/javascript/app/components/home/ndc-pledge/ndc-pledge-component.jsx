import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import { Button } from 'cw-components';
import button from 'styles/themes/button';
import { SOUTH_AFRICA_NDC_SUBMISSION } from 'constants/links';
import cx from 'classnames';
import styles from './ndc-pledge-styles.scss';

class NDCPledge extends PureComponent {
  handleNDCPledgeClick = () => {
    window.open(SOUTH_AFRICA_NDC_SUBMISSION, '_blank');
  };

  render() {
    const { title, description } = this.props;
    return (
      <div className={styles.ndcContainer}>
        <div className={styles.ndcImage} />
        <div className={styles.ndcTextContainer}>
          <SectionTitle isSubtitle className={styles.ndcTitle} title={title} />
          <p
            className={styles.ndcDescription}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Button
            onClick={this.handleNDCPledgeClick}
            theme={{ button: cx(button.white, styles.learnMoreButton) }}
          >
            Explore NDC submission
          </Button>
        </div>
      </div>
    );
  }
}
NDCPledge.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

NDCPledge.defaultProps = { title: null, description: null };
export default NDCPledge;
