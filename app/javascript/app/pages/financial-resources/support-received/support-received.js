import { connect } from 'react-redux';

import Component from './support-received-component';
import * as actions from './support-received-actions';

export default connect(null, actions)(Component);
