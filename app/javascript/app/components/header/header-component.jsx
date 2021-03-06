import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import cx from 'classnames';
import Nav from 'components/nav';
import environmentalAffairsLogo from 'assets/environmental-affairs-logo';
import envAffairsLogoSmall from 'assets/environmental-affairs-logo-small';
import SAflag from 'assets/south-africa-flag';
import { ENVIRONMENTAL_AFFAIRS_URL } from 'constants/links.js';
import { TabletLandscape } from 'components/responsive';
import styles from './header-styles.scss';

class Header extends PureComponent {
  render() {
    const { routes, className } = this.props;
    return (
      <div className={styles.headerContainer} id="header">
        <div className={cx(styles.header, className)}>
          <div className={styles.navbarContainer}>
            <div className={styles.navElement}>
              <a href={ENVIRONMENTAL_AFFAIRS_URL}>
                <TabletLandscape>
                  {matches => (
                    <img
                      src={
                        matches ? environmentalAffairsLogo : envAffairsLogoSmall
                      }
                      alt="Environmental Affairs Logo"
                      className={cx(styles.logo)}
                    />
                  )}
                </TabletLandscape>
              </a>
            </div>
            <div className={cx(styles.navElement, styles.pageTitleContainer)}>
              <Link to="/" onTouchStart={undefined} onMouseDown={undefined}>
                <div className={styles.climateText}>SOUTH AFRICA</div>
                <div className={styles.reportText}>
                  BIENNIAL UPDATE REPORT EXPLORER
                </div>
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
            <Nav
              theme={{
                nav: cx(styles.stickyNavElement, styles.stickyTabs),
                link: styles.stickyLink
              }}
              routes={routes}
            />
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
      </div>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.array.isRequired
};

Header.defaultProps = { className: '' };

export default Header;
