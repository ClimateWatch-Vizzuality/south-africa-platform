import { connect } from 'react-redux';

import Component from './prioritised-flagship-programmes-component';
import * as actions from './prioritised-flagship-programmes-actions';
import {
  getPrioritisedFlagshipProgrammes
} from './prioritised-flagship-programmes-selectors';

const mapStateToProps = getPrioritisedFlagshipProgrammes;

export default connect(mapStateToProps, actions)(Component);
