import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './gdp-growth-provider-actions';
import reducers, { initialState } from './gdp-growth-provider-reducers';

class GdpGrowthProvider extends PureComponent {
  componentDidMount() {
    const { fetchGdpGrowth } = this.props;
    fetchGdpGrowth();
  }

  render() {
    return null;
  }
}

GdpGrowthProvider.propTypes = { fetchGdpGrowth: PropTypes.func.isRequired };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(GdpGrowthProvider);
