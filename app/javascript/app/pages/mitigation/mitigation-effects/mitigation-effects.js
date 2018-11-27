import { connect } from 'react-redux';
import Component from './mitigation-effects-component';

import { getSustainableDevelopmentData } from './mitigation-effects-selectors';
import * as actions from './mitigation-effects-actions';

export default connect(getSustainableDevelopmentData, actions)(Component);
