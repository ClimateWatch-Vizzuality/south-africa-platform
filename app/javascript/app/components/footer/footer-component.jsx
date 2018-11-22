import React, { PureComponent } from 'react';
import { BottomBar } from 'cw-components';
import DownloadBox from 'components/download-box';
import partners from 'constants/partners';
import founders from 'constants/founders';
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.grid}>
          <div>
            <div className={styles.content}>
              <div className={styles.section}>
                <span>In cooperation with:</span>
                {partners.map(
                  partner => partner.img && (
                  <div
                    key={partner.img.alt}
                    className={styles.logoContainer}
                  >
                    <a
                      className={styles[partner.img.customClass]}
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
              <div className={styles.section}>
                <span>
                  Generous funding for this initiative is provided by:
                </span>
                <div className={styles.founders}>
                  {founders.map(founder => (
                    <div
                      key={founder.img.alt}
                      className={styles.foundersContainer}
                    >
                      <a
                        className={styles[founder.img.customClass]}
                        href={founder.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className={styles.foundersLogo}
                          src={founder.img.src}
                          alt={founder.img.alt}
                        />
                      </a>
                      {
                        founder.description && (
                        <div className={styles.description}>
                          {founder.description}
                        </div>
                          )
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.disclaimer}>
              Copyright &#169; Department of Environmental Affairs{' '}
              {new Date().getFullYear()}
            </div>
          </div>
          <div className={styles.downloadWrapper}>
            <DownloadBox />
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
