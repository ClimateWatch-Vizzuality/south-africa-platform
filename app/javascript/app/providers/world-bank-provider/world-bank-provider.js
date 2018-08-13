import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './world-bank-provider-actions';
import reducers, { initialState } from './world-bank-provider-reducers';

const { COUNTRY_ISO } = process.env;

class LoginProvider extends PureComponent {
  componentDidMount() {
    const { fetchWorldBank, iso } = this.props;
    fetchWorldBank({ iso });
  }

  render() {
    return null;
  }
}

LoginProvider.propTypes = {
  fetchWorldBank: PropTypes.func.isRequired,
  iso: PropTypes.string
};

LoginProvider.defaultProps = { iso: COUNTRY_ISO };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(LoginProvider);
