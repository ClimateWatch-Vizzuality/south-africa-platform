import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Component from './comparison-chart-component';
import { getComparison } from './comparison-chart-selectors';

const mapStateToProps = getComparison;

class CopmarisonChartContainer extends PureComponent {
  render() {
    const { handleFilterChange } = this.props;
    return <Component {...this.props} onFilterChange={handleFilterChange} />;
  }
}

CopmarisonChartContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  query: PropTypes.object
};

CopmarisonChartContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, null)(CopmarisonChartContainer);
