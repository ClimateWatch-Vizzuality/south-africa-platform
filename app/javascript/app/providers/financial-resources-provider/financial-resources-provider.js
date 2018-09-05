import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './financial-resources-provider-actions';
import reducers, {
  initialState
} from './financial-resources-provider-reducers';

class FinancialResourcesProvider extends PureComponent {
  componentDidMount() {
    const { fetchFinancialResources, params } = this.props;
    fetchFinancialResources(params);
  }

  render() {
    return null;
  }
}

FinancialResourcesProvider.propTypes = {
  fetchFinancialResources: PropTypes.func.isRequired,
  params: PropTypes.object
};

FinancialResourcesProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(FinancialResourcesProvider);
