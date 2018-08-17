import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './climate-risks-data-provider-actions';

import reducers, { initialState } from './climate-risks-data-provider-reducers';

class ClimateRisksDataProvider extends PureComponent {
  componentDidMount() {
    const { fetchClimateRisksData } = this.props;
    fetchClimateRisksData();
  }

  render() {
    return null;
  }
}
ClimateRisksDataProvider.propTypes = {
  fetchClimateRisksData: PropTypes.func.isRequired
};

ClimateRisksDataProvider.defaultProps = {};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(ClimateRisksDataProvider);
