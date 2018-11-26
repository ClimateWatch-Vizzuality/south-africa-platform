import { connect } from 'react-redux';

import Component from './support-needed-component';
import { getSupportNeeded } from './support-needed-selectors';
import * as actions from './support-needed-actions';

const mapStateToProps = getSupportNeeded;

export default connect(mapStateToProps, actions)(Component);
