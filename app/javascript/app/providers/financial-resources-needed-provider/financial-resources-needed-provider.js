import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './financial-resources-provider-actions';
import reducers, {
  initialState
} from './financial-resources-needed-provider-reducers';

class FinancialResourcesNeededProvider extends PureComponent {
  componentDidMount() {
    const { fetchFinancialResourcesNeeded, params } = this.props;
    fetchFinancialResourcesNeeded(params);
  }

  render() {
    return null;
  }
}

FinancialResourcesNeededProvider.propTypes = {
  fetchFinancialResourcesNeeded: PropTypes.func.isRequired,
  params: PropTypes.object
};

FinancialResourcesNeededProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(FinancialResourcesNeededProvider);
