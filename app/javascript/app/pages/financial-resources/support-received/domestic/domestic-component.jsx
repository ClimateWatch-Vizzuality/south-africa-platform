import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { BubbleChart } from 'cw-components';
import FinancialResourcesProvider from 'providers/financial-resources-provider';
import styles from './domestic-styles.scss';

class Domestic extends PureComponent {
  handleNodeClick = (e, id) => {
    e.preventDefault();
    const { onFilterChange } = this.props;
    onFilterChange('domesticId', id);
  };

  render() {
    const { data, selectedValues } = this.props;
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
              <h2 className={styles.label}>
                {selectedValues.financialFlow.label}
                {' '}by{' '}
                {selectedValues.donor && selectedValues.donor.label}
              </h2>
              <p className={styles.label}>Principal focus</p>
              <p className={styles.text}>Principal focus</p>
              <p className={styles.label}>Support commited</p>
              <p className={styles.text}>Support commited</p>
              <p className={styles.label}>Type of funding</p>
              <p className={styles.text}>Type of funding</p>
            </div>
              )
          }
        </div>
        <FinancialResourcesProvider />
      </div>
    );
  }
}

Domestic.propTypes = {
  data: PropTypes.array,
  selectedValues: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired
};

Domestic.defaultProps = { data: null, selectedValues: null };

export default Domestic;
