import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import styles from './flagship-button-styles.scss';

class FlagshipButton extends PureComponent {
  render() {
    const { section, flagshipImages, active, onClick } = this.props;
    return section
      ? (
        <button
          type="button"
          key={section.shortName}
          className={cx(styles.flagshipButton, { [styles.active]: active })}
          style={{
          backgroundImage: `url(${flagshipImages[`flagship${section.position}`]})`
        }}
          onClick={onClick}
        >
          {section.shortName}
        </button>
)
      : null;
  }
}

FlagshipButton.propTypes = {
  section: PropTypes.object.isRequired,
  flagshipImages: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool
};

FlagshipButton.defaultProps = { active: false };

export default FlagshipButton;
