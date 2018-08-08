import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link, { NavLink } from 'redux-first-router-link';
import cx from 'classnames';
import environmentalAffairsLogo from 'assets/environmental-affairs-logo.png';
import SAflag from 'assets/south-africa-flag.png';
import { ENVIRONMENTAL_AFFAIRS_URL } from '../../constants';

import styles from './nav-styles.scss';

class Nav extends PureComponent {
  render() {
    const { routes, className } = this.props;
    return (
      <nav className={cx(styles.header, className)}>
        <div className={styles.navbarContainer}>
          <div className={styles.navElement}>
            <a href={ENVIRONMENTAL_AFFAIRS_URL}>
              <img
                src={environmentalAffairsLogo}
                alt="Environmental Affairs Logo"
                className={cx(styles.logo)}
              />
            </a>
          </div>
          <div className={cx(styles.navElement, styles.pageTitleContainer)}>
            <Link to="/">
              <span className={styles.climatText}>Climate</span>
              <span className={styles.reportText}>Report</span>
            </Link>
          </div>
          <div className={cx(styles.navElement, styles.flagContainer)}>
            <img
              src={SAflag}
              alt="South Africa flag"
              className={cx(styles.flag)}
            />
          </div>
        </div>
        <div className={styles.tabsContainer}>
          {routes.map(route => (
            <NavLink
              className={styles.link}
              key={route.label}
              to={route.link}
              activeClassName={styles.active}
            >
              {route.label}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.array.isRequired
};

Nav.defaultProps = { className: '' };

export default Nav;
