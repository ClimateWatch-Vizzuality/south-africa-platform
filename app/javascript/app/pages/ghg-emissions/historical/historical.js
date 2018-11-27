import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Component from './historical-component';
import { getTotalGHGEMissions } from './historical-selectors';
import * as actions from './historical-actions';

const mapStateToProps = getTotalGHGEMissions;

class HistoricalContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({ query: { ...query, ...filter } });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

HistoricalContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

HistoricalContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, actions)(HistoricalContainer);
