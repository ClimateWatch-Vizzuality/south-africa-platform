import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './projected-emissions-provider-actions';
import reducers, {
  initialState
} from './projected-emissions-provider-reducers';

class ProjectedEmissionsProvider extends PureComponent {
  componentDidMount() {
    const { fetchProjectedEmissions, params } = this.props;
    fetchProjectedEmissions(params);
  }

  render() {
    return null;
  }
}

ProjectedEmissionsProvider.propTypes = {
  fetchProjectedEmissions: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(ProjectedEmissionsProvider);
