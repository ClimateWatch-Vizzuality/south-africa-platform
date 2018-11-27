import React, { PureComponent } from 'react';
import { Icon } from 'cw-components';
import downloadIcon from 'assets/icons/download';

import {
  FIRST_BIENNIAL_UPDATE_REPORT,
  SECOND_BIENNIAL_UPDATE_REPORT
} from 'constants/links';
import styles from './download-box-styles.scss';

class DownloadBox extends PureComponent {
  handleDownloadClick = doc => {
    window.open(doc, '_blank');
  };

  render() {
    return (
      <div className={styles.downloadBoxContainer}>
        <div className={styles.downloadBoxTitle}>
          Download
        </div>
        <div className={styles.downloadRow}>
          <span className={styles.fileTitle}>
            South Africas 2nd Biennial Update Report
          </span>
          <Icon
            onClick={() =>
              this.handleDownloadClick(SECOND_BIENNIAL_UPDATE_REPORT)}
            icon={downloadIcon}
          />
        </div>
        <div className={styles.downloadRow}>
          <span className={styles.fileTitle}>
            South Africas 1st Biennial Update Report
          </span>
          <Icon
            onClick={() =>
              this.handleDownloadClick(FIRST_BIENNIAL_UPDATE_REPORT)}
            icon={downloadIcon}
          />
        </div>
      </div>
    );
  }
}

export default DownloadBox;
