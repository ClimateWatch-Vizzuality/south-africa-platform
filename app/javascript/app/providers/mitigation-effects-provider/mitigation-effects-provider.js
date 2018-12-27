import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './mitigation-effects-provider-actions';
import * as reducers from './mitigation-effects-provider-reducers';

const { initialState } = reducers;

class MitigationEffectsProvider extends PureComponent {
  componentDidMount() {
    const { fetchMitigationEffects, params } = this.props;
    fetchMitigationEffects(params);
  }

  render() {
    return null;
  }
}

MitigationEffectsProvider.propTypes = {
  fetchMitigationEffects: PropTypes.func.isRequired,
  params: PropTypes.object
};

MitigationEffectsProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(MitigationEffectsProvider);
