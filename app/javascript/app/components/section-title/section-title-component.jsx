import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './section-title-styles.scss';

class SectionTitle extends PureComponent {
  render() {
    const { theme, title } = this.props;
    return (
      <h2 className={cx(styles.sectionTitle, theme.sectionTitle)}>
        {title}
      </h2>
    );
  }
}

SectionTitle.propTypes = {
  theme: PropTypes.shape({ sectionTitle: PropTypes.string }),
  title: PropTypes.string
};

SectionTitle.defaultProps = { theme: {}, title: '' };

export default SectionTitle;
