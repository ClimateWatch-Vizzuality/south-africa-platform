import { connect } from 'react-redux';
import Component from './gdp-growth-component';
import { getGdpGrowth } from './gdp-growth-selectors';

const mapStateToProps = getGdpGrowth;

export default connect(mapStateToProps, null)(Component);
