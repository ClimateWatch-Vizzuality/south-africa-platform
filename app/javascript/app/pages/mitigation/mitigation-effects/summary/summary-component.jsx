import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Dropdown, BubbleChart, NoContent } from 'cw-components';
import DataTable from 'components/data-table';
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
    const { onFilterChange, themeSelected } = this.props;
    const resetedTheme = themeSelected.value === 'All Selected' &&
      { theme: '' };
    onFilterChange({ visType: value, ...resetedTheme });
  };

  handleNodeClick = (e, id) => {
    e.preventDefault();
    const { onFilterChange } = this.props;
    onFilterChange({ summaryId: id });
  };

  render() {
    const {
      chartData,
      tableData,
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
          {
            themeOptions &&
              (
                <Dropdown
                  label="Theme"
                  value={themeSelected}
                  options={themeOptions}
                  onValueChange={this.handleThemeChange}
                  hideResetButton
                />
              )
          }
          {
            GHGOptions &&
              visTypeSelected.value !== 'table' &&
              (
                <Dropdown
                  label="GHG Emissions Reduction"
                  value={GHGSelected}
                  options={GHGOptions}
                  onValueChange={this.handleGHGChange}
                  hideResetButton
                />
              )
          }
          {
            visTypeOptions &&
              (
                <Dropdown
                  label="Visualization"
                  value={visTypeSelected}
                  options={visTypeOptions}
                  onValueChange={this.handleVisTypeChange}
                  hideResetButton
                />
              )
          }
          <div
            className={cx(styles.buttonGroupContainer, {
              [styles.tableViz]: visTypeSelected.value === 'table'
            })}
          >
            <InfoDownloadToolbox
              slugs="BUR2"
              className={styles.buttonWrapper}
              downloadUri="mitigation/mitigation_effects"
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
            : tableData &&
              (
                <DataTable
                  tableData={tableData}
                  dynamicRowsHeight
                  setColumnWidth={() => 150}
                />
              )
        }
      </div>
    );
  }
}

Summary.propTypes = {
  chartData: PropTypes.array,
  tableData: PropTypes.object,
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
  tableData: {},
  summarySelected: null,
  themeOptions: [],
  themeSelected: null,
  visTypeOptions: [],
  visTypeSelected: null,
  GHGOptions: [],
  GHGSelected: null
};

export default Summary;
