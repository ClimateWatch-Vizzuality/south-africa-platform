import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './sections-content-provider-actions';
import reducers, { initialState } from './sections-content-provider-reducers';

class SectionsContentProvider extends PureComponent {
  componentDidMount() {
    const { fetchSectionsContent } = this.props;
    fetchSectionsContent();
  }

  render() {
    return null;
  }
}

SectionsContentProvider.propTypes = {
  fetchSectionsContent: PropTypes.func.isRequired
};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(SectionsContentProvider);
