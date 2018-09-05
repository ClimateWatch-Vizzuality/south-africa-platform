import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './distribution-by-age-provider-actions';
import reducers, {
  initialState
} from './distribution-by-age-provider-reducers';

class DistributionByAgeProvider extends PureComponent {
  componentDidMount() {
    const { fetchDistributionByAge, params } = this.props;
    fetchDistributionByAge(params);
  }

  render() {
    return null;
  }
}

DistributionByAgeProvider.propTypes = {
  fetchDistributionByAge: PropTypes.func.isRequired,
  params: PropTypes.object
};

DistributionByAgeProvider.defaultProps = { params: {} };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(DistributionByAgeProvider);
