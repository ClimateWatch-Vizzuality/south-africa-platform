import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';
import * as ownActions from './population-tab-actions';

import Component from './population-tab-component';

const actions = { ...ownActions, setModalMetadata };

class PopulationTabContainer extends PureComponent {
  onFilterChange = filter => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({
      section: 'population',
      query: { ...query, ...filter }
    });
  };

  render() {
    return <Component {...this.props} onFilterChange={this.onFilterChange} />;
  }
}

PopulationTabContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

PopulationTabContainer.defaultProps = {};

export default connect(null, actions)(PopulationTabContainer);
