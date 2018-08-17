import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './ghg-meta-provider-actions';
import reducers, { initialState } from './ghg-meta-provider-reducers';

class GHGMetaProvider extends PureComponent {
  componentDidMount() {
    this.props.fetchGHGMeta();
  }

  render() {
    return null;
  }
}

GHGMetaProvider.propTypes = { fetchGHGMeta: PropTypes.func.isRequired };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(GHGMetaProvider);
