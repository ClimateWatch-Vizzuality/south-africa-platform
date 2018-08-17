import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import Component from './energy-component';
import { getTotalGHGEMissions } from './energy-selectors';
import * as ownActions from './energy-actions';

const actions = { ...ownActions, setModalMetadata };

const mapStateToProps = getTotalGHGEMissions;

class EnergyContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({ query: { ...query, ...filter } });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

EnergyContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

EnergyContainer.defaultProps = {};

export default connect(mapStateToProps, actions)(EnergyContainer);
