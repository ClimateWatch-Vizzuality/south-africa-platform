import { connect } from 'react-redux';
import Component from './flows-chart-component';
import { getFlowsChart } from './flows-chart-selectors';

const mapStateToProps = (state, props) => getFlowsChart(props);

export default connect(mapStateToProps, null)(Component);
