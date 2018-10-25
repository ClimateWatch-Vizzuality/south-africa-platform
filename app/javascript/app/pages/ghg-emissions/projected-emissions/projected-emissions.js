import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './projected-emissions-actions';
import { getData } from './projected-emissions-selectors';

import Component from './projected-emissions-component';

class ProjectedEmissionsContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({
      section: 'projected-emissions',
      query: { ...query, ...filter }
    });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

ProjectedEmissionsContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

ProjectedEmissionsContainer.defaultProps = { query: {} };

export default connect(getData, actions)(ProjectedEmissionsContainer);
