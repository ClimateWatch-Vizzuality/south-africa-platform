import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './mitigation-actions-styles.scss';

class Nav extends PureComponent {
  render() {
    return <p className={styles.text}>The mitigation actions section</p>;
  }
}

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
