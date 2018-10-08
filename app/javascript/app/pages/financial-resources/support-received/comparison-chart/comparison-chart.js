import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Component from './comparison-chart-component';
import { getComparison } from './comparison-chart-selectors';

class ComparisonChartContainer extends PureComponent {
  render() {
    const { handleFilterChange } = this.props;
    return <Component {...this.props} onFilterChange={handleFilterChange} />;
  }
}

ComparisonChartContainer.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  query: PropTypes.object
};

ComparisonChartContainer.defaultProps = { query: {} };

export default connect(getComparison, null)(ComparisonChartContainer);
