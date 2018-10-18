import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './national-circumstances-priorities-provider-actions';

import reducers, {
  initialState
} from './national-circumstances-priorities-provider-reducers';

class NationalCircumstancesPrioritiesProvider extends PureComponent {
  componentDidMount() {
    const { fetchNationalCircumstancesPriorities } = this.props;
    fetchNationalCircumstancesPriorities();
  }

  render() {
    return null;
  }
}
NationalCircumstancesPrioritiesProvider.propTypes = {
  fetchNationalCircumstancesPriorities: PropTypes.func.isRequired
};

NationalCircumstancesPrioritiesProvider.defaultProps = {};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(NationalCircumstancesPrioritiesProvider);
