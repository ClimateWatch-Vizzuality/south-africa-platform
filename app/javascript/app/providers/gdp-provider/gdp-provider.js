import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './gdp-provider-actions';
import reducers, { initialState } from './gdp-provider-reducers';

class GdpProvider extends PureComponent {
  componentDidMount() {
    const { fetchGdp, params } = this.props;
    fetchGdp(params);
  }

  render() {
    return null;
  }
}

GdpProvider.propTypes = {
  fetchGdp: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(GdpProvider);
