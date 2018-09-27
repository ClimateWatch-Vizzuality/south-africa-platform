import { connect } from 'react-redux';

import Component from './flagship-programmes-component';
import * as actions from './flagship-programmes-actions';

export default connect(null, actions)(Component);
