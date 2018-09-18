import React, { PureComponent } from 'react';
import { Icon } from 'cw-components';
import downloadIcon from 'assets/icons/download';
import styles from './download-box-styles.scss';

class DownloadBox extends PureComponent {
  render() {
    return (
      <div className={styles.downloadBoxContainer}>
        <div className={styles.downloadBoxTitle}>
          Download
        </div>
        <div className={styles.downloadRow}>
          <span className={styles.fileTitle}>
            South Africas 1st Biennial Update Report
          </span>
          <Icon icon={downloadIcon} />
        </div>
        <div className={styles.downloadRow}>
          <span className={styles.fileTitle}>
            South Africas 2nd Biennial Update Report
          </span>
          <Icon icon={downloadIcon} />
        </div>
      </div>
    );
  }
}

export default DownloadBox;
