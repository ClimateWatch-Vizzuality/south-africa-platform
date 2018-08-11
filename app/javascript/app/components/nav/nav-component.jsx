import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link, { NavLink } from 'redux-first-router-link';
import cx from 'classnames';
import environmentalAffairsLogo from 'assets/environmental-affairs-logo.png';
import envAffairsLogoSmall from 'assets/environmental-affairs-logo-small.png';
import SAflag from 'assets/south-africa-flag.png';
import { ENVIRONMENTAL_AFFAIRS_URL } from 'constants/links.js';

import styles from './nav-styles.scss';

class Nav extends PureComponent {
  render() {
    const { routes, className } = this.props;
    return (
      <nav className={styles.headerContainer}>
        <div className={cx(styles.header, className)}>
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
            <div
              className={cx(styles.stickyNavElement, styles.stickyImageElement)}
            >
              <img
                src={envAffairsLogoSmall}
                alt="Environmental Affairs Logo"
                className={cx(styles.smallLogo)}
              />
            </div>
            <div className={cx(styles.stickyNavElement, styles.stickyTabs)}>
              {routes.map(route => (
                <NavLink
                  exact
                  className={styles.link}
                  key={route.label}
                  to={route.link}
                  activeClassName={styles.active}
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
            <div
              className={cx(
                styles.stickyNavElement,
                styles.stickyImageElement,
                styles.stickyFlag
              )}
            >
              <img
                src={SAflag}
                alt="South Africa flag"
                className={cx(styles.smallFlag)}
              />
            </div>
          </div>
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
