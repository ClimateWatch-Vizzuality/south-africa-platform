import { connect } from 'react-redux';
import Component from './gdp-growth-component';
import { getGdpGrowth } from './gdp-growth-selectors';

export default connect(getGdpGrowth, null)(Component);
