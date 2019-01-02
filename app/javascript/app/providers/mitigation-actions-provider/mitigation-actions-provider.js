import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './mitigation-actions-provider-actions';
import * as reducers from './mitigation-actions-provider-reducers';

const { initialState } = reducers;

class MitigationActionsProvider extends PureComponent {
  componentDidMount() {
    const { fetchMitigationActions, params } = this.props;
    fetchMitigationActions(params);
  }

  render() {
    return null;
  }
}

MitigationActionsProvider.propTypes = {
  fetchMitigationActions: PropTypes.func.isRequired,
  params: PropTypes.object
};

MitigationActionsProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(MitigationActionsProvider);
