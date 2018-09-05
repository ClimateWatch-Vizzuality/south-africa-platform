import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Component from './support-received-component';
import * as actions from './support-received-actions';
import { getSupportReceived } from './support-received-selectors';

const mapStateToProps = getSupportReceived;

class SupportReceivedContainer extends PureComponent {
  handleFilterChange = (filter, value) => {
    const { updateFiltersSelected, query } = this.props;
    updateFiltersSelected({ query: { ...query, [filter]: value } });
  };

  render() {
    return (
      <Component {...this.props} handleFilterChange={this.handleFilterChange} />
    );
  }
}

SupportReceivedContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  query: PropTypes.object
};

SupportReceivedContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, actions)(SupportReceivedContainer);
