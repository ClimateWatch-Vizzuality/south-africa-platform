import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Component from './domestic-component';
import { getDomestic } from './domestic-selectors';

const mapStateToProps = getDomestic;

class DomesticContainer extends PureComponent {
  render() {
    const { handleFilterChange } = this.props;
    return <Component {...this.props} onFilterChange={handleFilterChange} />;
  }
}

DomesticContainer.propTypes = {
  updateFiltersSelected: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  query: PropTypes.object
};

DomesticContainer.defaultProps = { query: {} };

export default connect(mapStateToProps, null)(DomesticContainer);
