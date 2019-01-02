import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './national-circumstances-provider-actions';

import * as reducers from './national-circumstances-provider-reducers';

const { initialState } = reducers;

class NationalCircumstancesProvider extends PureComponent {
  componentDidMount() {
    const { fetchNationalCircumstances } = this.props;
    fetchNationalCircumstances();
  }

  render() {
    return null;
  }
}
NationalCircumstancesProvider.propTypes = {
  fetchNationalCircumstances: PropTypes.func.isRequired
};

NationalCircumstancesProvider.defaultProps = {};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(NationalCircumstancesProvider);
