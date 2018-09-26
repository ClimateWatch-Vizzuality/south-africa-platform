import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSummary } from './summary-selectors';
import Component from './summary-component';

import * as actions from './summary-actions';

const mapStateToProps = getSummary;

class SummaryContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({
      query: { ...query, ...filter },
      section: 'mitigation-effects'
    });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

SummaryContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

SummaryContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, actions)(SummaryContainer);
