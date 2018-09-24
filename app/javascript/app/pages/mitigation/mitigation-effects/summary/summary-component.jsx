import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, BubbleChart, NoContent } from 'cw-components';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './summary-styles';

class Summary extends PureComponent {
  handleThemeChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ theme: value, summaryId: '', ghgEmissionsReduction: '' });
  };

  handleGHGChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ ghgEmissionsReduction: value });
  };

  handleVisTypeChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ visType: value });
  };

  handleNodeClick = (e, id) => {
    e.preventDefault();
    const { onFilterChange } = this.props;
    onFilterChange({ summaryId: id });
  };

  render() {
    const {
      chartData,
      summarySelected,
      themeOptions,
      themeSelected,
      visTypeSelected,
      visTypeOptions,
      GHGSelected,
      GHGOptions
    } = this.props;
    return (
      <div>
        <div className={styles.columns}>
          <Dropdown
            label="Theme"
            value={themeSelected}
            options={themeOptions}
            onValueChange={this.handleThemeChange}
            hideResetButton
          />
          <Dropdown
            label="GHG Emissions Reduction"
            value={GHGSelected}
            options={GHGOptions}
            onValueChange={this.handleGHGChange}
            hideResetButton
          />
          <Dropdown
            label="Visualization"
            value={visTypeSelected}
            options={visTypeOptions}
            onValueChange={this.handleVisTypeChange}
            hideResetButton
            disabled
          />
          <div className={styles.buttonGroupContainer}>
            <InfoDownloadToolbox
              slugs="historical_emissions_cait"
              className={styles.buttonWrapper}
            />
          </div>
        </div>
        {
          visTypeSelected.value === 'bubble-chart'
            ? (
              <div className={styles.contentContainer}>
                <div className={styles.chartContainer}>
                  {
                  chartData
                    ? (
                      <BubbleChart
                        width={400}
                        height={400}
                        data={chartData}
                        handleNodeClick={this.handleNodeClick}
                        tooltipClassName="global_SATooltip"
                      />
)
                    : <NoContent minHeight={400} message="No data available" />
                }
                </div>
                <div className={styles.infoContainer}>
                  {
                  summarySelected && (
                  <div>
                    <p className={styles.label}>Action</p>
                    <h2 className={styles.action}>
                      {summarySelected.action}
                    </h2>
                    <p className={styles.label}>Actor</p>
                    <p className={styles.text}>{summarySelected.actor}</p>
                  </div>
                    )
                }
                </div>
              </div>
)
            : <div>TABLE</div>
        }
      </div>
    );
  }
}

Summary.propTypes = {
  chartData: PropTypes.array,
  summarySelected: PropTypes.object,
  themeOptions: PropTypes.array,
  themeSelected: PropTypes.object,
  visTypeOptions: PropTypes.array,
  visTypeSelected: PropTypes.object,
  GHGOptions: PropTypes.array,
  GHGSelected: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired
};

Summary.defaultProps = {
  chartData: [],
  summarySelected: null,
  themeOptions: [],
  themeSelected: null,
  visTypeOptions: [],
  visTypeSelected: null,
  GHGOptions: [],
  GHGSelected: null
};

export default Summary;
