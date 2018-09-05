import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';
import { getSummary } from './summary-selectors';
import Component from './summary-component';

import * as ownActions from './summary-actions';

const actions = { ...ownActions, setModalMetadata };
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
    return (
      <Component
        {...this.props}
        onFilterChange={this.onFilterChange}
        updateDataColor={this.updateDataColor}
      />
    );
  }
}

SummaryContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

SummaryContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, actions)(SummaryContainer);
