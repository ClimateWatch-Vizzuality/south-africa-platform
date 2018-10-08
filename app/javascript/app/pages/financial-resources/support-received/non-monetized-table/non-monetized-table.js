import { connect } from 'react-redux';
import has from 'lodash/has';
import Component from './non-monetized-table-component';
import { getNonMonetizedData } from './non-monetized-table-selectors';

const mapStateToProps = (state, props) =>
  getNonMonetizedData({
    data: props.data,
    meta: has(state, 'financialResourcesReceived.data.meta') &&
      state.financialResourcesReceived.data.meta
  });

export default connect(mapStateToProps, null)(Component);
