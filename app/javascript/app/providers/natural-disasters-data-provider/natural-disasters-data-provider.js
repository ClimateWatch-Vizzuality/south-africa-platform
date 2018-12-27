import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './natural-disasters-data-provider-actions';

import * as reducers from './natural-disasters-data-provider-reducers';

const { initialState } = reducers;

class NaturalDisastersDataProvider extends PureComponent {
  componentDidMount() {
    const { fetchNaturalDisastersData } = this.props;
    fetchNaturalDisastersData();
  }

  render() {
    return null;
  }
}
NaturalDisastersDataProvider.propTypes = {
  fetchNaturalDisastersData: PropTypes.func.isRequired
};

NaturalDisastersDataProvider.defaultProps = {};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(NaturalDisastersDataProvider);
