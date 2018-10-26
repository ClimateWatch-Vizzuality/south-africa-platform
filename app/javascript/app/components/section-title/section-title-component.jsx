import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import iconInfo from 'assets/icons/info';
import { Icon } from 'cw-components';
import styles from './section-title-styles.scss';

class SectionTitle extends PureComponent {
  handleInfoClick = () => {
    const { setOpen } = this.props;
    setOpen(true);
  };

  render() {
    const { theme, title, isSubtitle, infoButton, className } = this.props;
    return (
      <div className={styles.sectionTitleContainer}>
        <h2
          className={cx(
            styles.sectionTitle,
            { [styles.sectionSubtitle]: isSubtitle },
            theme.sectionTitle,
            className
          )}
        >
          {title}
        </h2>
        {
          infoButton && (
          <button
            onClick={this.handleInfoClick}
            className={cx(styles.iconContainer, theme.iconContainer)}
            type="button"
          >
            <Icon icon={iconInfo} />
          </button>
            )
        }
      </div>
    );
  }
}

SectionTitle.propTypes = {
  theme: PropTypes.shape({ sectionTitle: PropTypes.string }),
  title: PropTypes.string,
  infoButton: PropTypes.bool,
  className: PropTypes.string,
  isSubtitle: PropTypes.bool,
  setOpen: PropTypes.func.isRequired
};

SectionTitle.defaultProps = {
  theme: {},
  title: '',
  isSubtitle: false,
  infoButton: false,
  className: null
};

export default SectionTitle;
