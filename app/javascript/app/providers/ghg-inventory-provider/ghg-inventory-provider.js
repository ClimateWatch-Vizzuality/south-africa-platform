import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './ghg-inventory-provider-actions';
import * as reducers from './ghg-inventory-provider-reducers';

const { initialState } = reducers;

class GHGInventoryProvider extends PureComponent {
  componentDidMount() {
    const { fetchGHGInventory, params } = this.props;
    fetchGHGInventory(params);
  }

  render() {
    return null;
  }
}

GHGInventoryProvider.propTypes = {
  fetchGHGInventory: PropTypes.func.isRequired,
  params: PropTypes.object
};

GHGInventoryProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(GHGInventoryProvider);
