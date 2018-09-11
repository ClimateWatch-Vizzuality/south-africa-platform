import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './human-development-index-provider-actions';
import reducers, {
  initialState
} from './human-development-index-provider-reducers';

class HumanDevelopmentIndexProvider extends PureComponent {
  componentDidMount() {
    const { fetchHumanDevelopmentIndex, params } = this.props;
    fetchHumanDevelopmentIndex(params);
  }

  render() {
    return null;
  }
}

HumanDevelopmentIndexProvider.propTypes = {
  fetchHumanDevelopmentIndex: PropTypes.func.isRequired,
  params: PropTypes.object
};

HumanDevelopmentIndexProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(HumanDevelopmentIndexProvider);
