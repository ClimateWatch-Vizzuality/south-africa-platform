import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { Chart } from 'cw-components';
import NationalCircumstancesProvider from 'providers/national-circumstances-provider';
import {
  DOWNLOAD_URI
} from 'pages/national-circumstances/economy/economy-constants';
import { CustomYAxisTick } from './axis-ticks';
import HdiTooltip from './hdi-tooltip-chart';

import styles from './human-development-index-styles';

class HumanDevelopmentIndex extends PureComponent {
  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  render() {
    const { chartData } = this.props;
    return (
      <React.Fragment>
        <div className={styles.toolbar}>
          <InfoDownloadToolbox slugs="UNDP2018" downloadUri={DOWNLOAD_URI} />
        </div>
        <div className={styles.chart}>
          {
            chartData &&
              (
                <Chart
                  type="line"
                  lineType="linear"
                  dots={false}
                  customMessage="Economy data not available"
                  hideRemoveOptions
                  customYAxisTick={<CustomYAxisTick />}
                  customTooltip={<HdiTooltip />}
                  {...chartData}
                  showUnit
                />
              )
          }
        </div>
        <NationalCircumstancesProvider />
      </React.Fragment>
    );
  }
}

HumanDevelopmentIndex.propTypes = {
  chartData: PropTypes.object,
  humanDevelopmentIndexParams: PropTypes.object
};

HumanDevelopmentIndex.defaultProps = {
  chartData: {},
  humanDevelopmentIndexParams: null
};

export default HumanDevelopmentIndex;
