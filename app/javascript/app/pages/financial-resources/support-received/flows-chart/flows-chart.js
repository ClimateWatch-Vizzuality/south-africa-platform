import { connect } from 'react-redux';
import has from 'lodash/has';
import Component from './flows-chart-component';
import { getFlowsChart } from './flows-chart-selectors';

const mapStateToProps = (state, props) =>
  getFlowsChart({
    data: props.data,
    meta: has(state, 'financialResourcesReceived.data.meta') &&
      state.financialResourcesReceived.data.meta
  });

export default connect(mapStateToProps, null)(Component);
