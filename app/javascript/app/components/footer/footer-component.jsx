import React, { PureComponent } from 'react';
import { BottomBar } from 'cw-components';
import DownloadBox from 'components/download-box';
import cx from 'classnames';

import partners from 'constants/partners';
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.grid}>
          <div className={styles.footerContainer}>
            <div className={styles.firstColumnFooter}>
              <div className={styles.content}>
                <span>Support received from:</span>
                <div className="grid-column-item">
                  <div className={styles.contentWrapper}>
                    <div className="grid-column-item">
                      <div className={styles.partnersContainer}>
                        {partners.map(
                          partner => partner.img && (
                          <div
                            key={partner.img.alt}
                            className={styles.logoContainer}
                          >
                            <a
                              className={cx(
                                    styles.logo,
                                    styles[partner.img.customClass]
                                  )}
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className={styles.defaultLogo}
                                src={partner.img.src}
                                alt={partner.img.alt}
                              />
                            </a>
                          </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.disclaimer}>
                  Copyright &#169; Department of Environmental Affairs{' '}
                  {new Date().getFullYear()}
                </div>
              </div>
            </div>
            <div className={styles.secondColumnFooter}>
              <DownloadBox />
            </div>
          </div>
        </div>
        <BottomBar
          footerText={
            `Powered by <span style="text-transform: uppercase"><b>Climate</b>Watch</span>`
          }
          className={styles.content}
          theme={{
            bottomBar: styles.bottomBar,
            bottomBarContainer: styles.bottomBarContainer,
            bottomBarText: styles.bottomBarText
          }}
        />
      </footer>
    );
  }
}

export default Footer;
