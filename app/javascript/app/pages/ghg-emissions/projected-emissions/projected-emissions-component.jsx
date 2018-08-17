import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './projected-emissions-styles.scss';

class Nav extends PureComponent {
  render() {
    return <p className={styles.text}>The ghg projected emissions section</p>;
  }
}

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
