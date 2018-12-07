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
        <button
          type="button"
          className={styles.downloadRow}
          onClick={() =>
            this.handleDownloadClick(SECOND_BIENNIAL_UPDATE_REPORT)}
        >
          <span>South Africas 2nd Biennial Update Report</span>
          <Icon icon={downloadIcon} />
        </button>
        <button
          type="button"
          className={styles.downloadRow}
          onClick={() => this.handleDownloadClick(FIRST_BIENNIAL_UPDATE_REPORT)}
        >
          <span>South Africas 1st Biennial Update Report</span>
          <Icon icon={downloadIcon} />
        </button>
      </div>
    );
  }
}

export default DownloadBox;
