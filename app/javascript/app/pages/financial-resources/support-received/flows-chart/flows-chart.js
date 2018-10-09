import { connect } from 'react-redux';
import Component from './flows-chart-component';
import { getFlowsChart } from './flows-chart-selectors';

export default connect(getFlowsChart, null)(Component);
