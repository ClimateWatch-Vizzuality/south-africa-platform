import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './section-title-styles.scss';

class SectionTitle extends PureComponent {
  render() {
    const { theme, title, isSubtitle } = this.props;
    return (
      <h2
        className={cx(
          styles.sectionTitle,
          { [styles.sectionSubtitle]: isSubtitle },
          theme.sectionTitle
        )}
      >
        {title}
      </h2>
    );
  }
}

SectionTitle.propTypes = {
  theme: PropTypes.shape({ sectionTitle: PropTypes.string }),
  title: PropTypes.string,
  isSubtitle: PropTypes.bool
};

SectionTitle.defaultProps = { theme: {}, title: '', isSubtitle: false };

export default SectionTitle;
