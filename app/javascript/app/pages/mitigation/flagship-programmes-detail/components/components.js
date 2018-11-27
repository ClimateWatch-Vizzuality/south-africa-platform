import { connect } from 'react-redux';

import * as actions from './components-actions';
import Component from './components-component';

import { getFlagshipComponents } from './components-selectors';

const mapStateToProps = getFlagshipComponents;

export default connect(mapStateToProps, actions)(Component);
