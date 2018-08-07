import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link, { NavLink } from 'redux-first-router-link';
import cx from 'classnames';
import { Icon } from 'cw-components';

import cwLogo from 'assets/cw-logo.svg';
import styles from './nav-styles.scss';

class Nav extends PureComponent {
  render() {
    const { routes, className } = this.props;
    return (
      <nav className={cx(styles.navbar, className)}>
        <Link className={styles.link} to="/">
          <Icon theme={{ icon: styles.logo }} icon={cwLogo} />
        </Link>
        {routes.map(route => (
          <NavLink className={styles.link} key={route.label} to={route.link} activeClassName={styles.active}>
            {route.label}
          </NavLink>
        ))}
      </nav>
    );
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.array.isRequired
};

Nav.defaultProps = {
  className: ''
};

export default Nav;
