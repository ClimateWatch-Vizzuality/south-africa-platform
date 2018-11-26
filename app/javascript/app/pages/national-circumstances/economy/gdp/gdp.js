import { connect } from 'react-redux';
import Component from './gdp-component';
import { getGdp } from './gdp-selectors';
import * as actions from './gdp-actions';

const mapStateToProps = getGdp;

export default connect(mapStateToProps, actions)(Component);
