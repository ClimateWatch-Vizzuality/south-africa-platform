import { connect } from 'react-redux';

import * as actions from './components-actions';
import Component from './components-component';

import { getFlagshipComponentsInfo } from './components-selectors';

const mapStateToProps = getFlagshipComponentsInfo;

export default connect(mapStateToProps, actions)(Component);
