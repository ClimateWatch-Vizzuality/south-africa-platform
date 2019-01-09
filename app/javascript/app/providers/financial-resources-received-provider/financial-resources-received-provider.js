import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './financial-resources-received-provider-actions';
import reducers, {
  initialState
} from './financial-resources-received-provider-reducers';

class FinancialResourcesReceivedProvider extends PureComponent {
  componentDidMount() {
    const { fetchFinancialResourcesReceived, params } = this.props;
    fetchFinancialResourcesReceived(params);
  }

  render() {
    return null;
  }
}

FinancialResourcesReceivedProvider.propTypes = {
  fetchFinancialResourcesReceived: PropTypes.func.isRequired,
  params: PropTypes.object
};

FinancialResourcesReceivedProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(FinancialResourcesReceivedProvider);
