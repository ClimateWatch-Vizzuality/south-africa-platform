import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './overview-country-info-provider-actions';

import reducers, { initialState } from './overview-country-info-reducers';

const { COUNTRY_ISO } = process.env;

class OverviewCountryInfoProvider extends PureComponent {
  componentDidMount() {
    const { fetchCountryOverviewInfo, iso } = this.props;
    fetchCountryOverviewInfo({ iso });
  }

  render() {
    return null;
  }
}
OverviewCountryInfoProvider.propTypes = {
  fetchCountryOverviewInfo: PropTypes.func.isRequired,
  iso: PropTypes.string
};

OverviewCountryInfoProvider.defaultProps = { iso: COUNTRY_ISO };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(OverviewCountryInfoProvider);
