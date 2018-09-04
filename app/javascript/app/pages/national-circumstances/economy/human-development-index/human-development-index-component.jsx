import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalMetadata from 'components/modal-metadata';
import InfoDownloadToolbox from 'components/info-download-toolbox';
import { Chart } from 'cw-components';
import HumanDevelopmentIndexProvider from 'providers/human-development-index-provider';
import { CustomYAxisTick } from './axis-ticks';
import HdiTooltip from './hdi-tooltip-chart';

import styles from './human-development-index-styles';

class HumanDevelopmentIndex extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      open: true
    });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  render() {
    const { chartData } = this.props;
    return (
      <React.Fragment>
        <div className={styles.toolbar}>
          <InfoDownloadToolbox
            slug="economy"
            handleInfoClick={this.handleInfoClick}
          />
        </div>
        <div className={styles.chart}>
          <Chart
            type="line"
            lineType="linear"
            dots={false}
            customMessage="Emissions data not available"
            hideRemoveOptions
            customYAxisTick={<CustomYAxisTick />}
            customTooltip={<HdiTooltip />}
            {...chartData}
          />
        </div>
        <ModalMetadata />
        <HumanDevelopmentIndexProvider />
      </React.Fragment>
    );
  }
}

HumanDevelopmentIndex.propTypes = {
  chartData: PropTypes.object,
  humanDevelopmentIndexParams: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired
};

HumanDevelopmentIndex.defaultProps = {
  chartData: {},
  humanDevelopmentIndexParams: null
};

export default HumanDevelopmentIndex;
