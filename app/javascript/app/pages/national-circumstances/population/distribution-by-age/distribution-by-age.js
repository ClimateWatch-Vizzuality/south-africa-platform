import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './distribution-by-age-actions';

import Component from './distribution-by-age-component';
import { getDummyData } from './distribution-by-age-selectors';

const mapStateToProps = getDummyData;

class DistributionByAgeContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({
      section: 'population',
      query: { ...query, ...filter, tab: 'distribution-by-age' }
    });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

DistributionByAgeContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

DistributionByAgeContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, actions)(DistributionByAgeContainer);
