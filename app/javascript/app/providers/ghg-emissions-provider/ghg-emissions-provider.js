import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './ghg-emissions-provider-actions';
import reducers, { initialState } from './ghg-emissions-provider-reducers';

class LoginProvider extends PureComponent {
  componentDidMount() {
    const { fetchGHGEmissions, params } = this.props;
    fetchGHGEmissions(params);
  }

  render() {
    return null;
  }
}

LoginProvider.propTypes = {
  fetchGHGEmissions: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(LoginProvider);
