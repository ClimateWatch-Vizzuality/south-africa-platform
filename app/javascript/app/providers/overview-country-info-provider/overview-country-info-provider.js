import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './overview-country-info-provider-actions';

import reducers, { initialState } from './overview-country-info-reducers';

const COUNTRY_ISO = 'ZAF';
class CardsOverviewProvider extends PureComponent {
  componentDidMount() {
    const { fetchCardsOverviewContent, iso } = this.props;
    fetchCardsOverviewContent({ iso });
  }

  render() {
    return null;
  }
}
CardsOverviewProvider.propTypes = {
  fetchCardsOverviewContent: PropTypes.func.isRequired,
  iso: PropTypes.string
};

CardsOverviewProvider.defaultProps = { iso: COUNTRY_ISO };

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(CardsOverviewProvider);
