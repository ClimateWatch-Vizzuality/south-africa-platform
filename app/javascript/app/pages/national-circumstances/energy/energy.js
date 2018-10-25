import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Component from './energy-component';
import { getTotalGHGEMissions } from './energy-selectors';
import * as actions from './energy-actions';

const mapStateToProps = getTotalGHGEMissions;

class EnergyContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({
      section: 'energy',
      query: { ...query, ...filter }
    });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

EnergyContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

EnergyContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, actions)(EnergyContainer);
