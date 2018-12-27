import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './flagship-programmes-provider-actions';
import * as reducers from './flagship-programmes-provider-reducers';

const { initialState } = reducers;

class FlagshipProgrammesProvider extends PureComponent {
  componentDidMount() {
    const { fetchFlagshipProgrammes } = this.props;
    fetchFlagshipProgrammes();
  }

  render() {
    return null;
  }
}

FlagshipProgrammesProvider.propTypes = {
  fetchFlagshipProgrammes: PropTypes.func.isRequired
};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(FlagshipProgrammesProvider);
