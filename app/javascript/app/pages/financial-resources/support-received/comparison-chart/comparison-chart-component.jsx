import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { BubbleChart } from 'cw-components';
import FinancialResourcesReceivedProvider from 'providers/financial-resources-received-provider';
import styles from './comparison-chart-styles.scss';

class ComparisonChart extends PureComponent {
  handleNodeClick = (e, id) => {
    e.preventDefault();
    const { onFilterChange } = this.props;
    onFilterChange('comparisonId', id);
  };

  render() {
    const { data, selectedData, selectedValues } = this.props;
    return (
      <div className={styles.contentContainer}>
        <div className={styles.chartContainer}>
          {
            data &&
              (
                <BubbleChart
                  width={400}
                  height={400}
                  data={data}
                  handleNodeClick={this.handleNodeClick}
                  tooltipClassName="global_SATooltip"
                />
              )
          }
        </div>
        <div className={styles.infoContainer}>
          {
            selectedValues && (
            <div>
              <h2 className={styles.title}>
                {
                      selectedValues.financialFlow &&
                        selectedValues.financialFlow.label
                    }
                {' '}by{' '}
                {selectedValues.donor && selectedValues.donor.label}
              </h2>
              <p className={styles.text}>
                {selectedData && selectedData.purposeFunds}
              </p>
              <p className={styles.label}>Principal focus</p>
              <p className={styles.text}>Principal focus</p>
              <p className={styles.label}>Support commited</p>
              <p className={styles.text}>Support commited</p>
              <p className={styles.label}>Type of funding</p>
              <p className={styles.text}>
                {selectedData && selectedData.typeFunds}
              </p>
            </div>
              )
          }
        </div>
        <FinancialResourcesReceivedProvider />
      </div>
    );
  }
}

ComparisonChart.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.object,
  selectedValues: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired
};

ComparisonChart.defaultProps = {
  data: null,
  selectedData: null,
  selectedValues: null
};

export default ComparisonChart;
