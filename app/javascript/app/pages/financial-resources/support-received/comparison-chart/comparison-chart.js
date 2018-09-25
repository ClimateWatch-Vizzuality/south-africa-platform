import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Component from './comparison-chart-component';
import { getComparison } from './comparison-chart-selectors';

const mapStateToProps = (state, props) =>
  getComparison({ location: state.location, data: props.data });

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

export default connect(mapStateToProps, null)(ComparisonChartContainer);
