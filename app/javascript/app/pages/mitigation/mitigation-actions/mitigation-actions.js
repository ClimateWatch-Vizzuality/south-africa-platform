import { connect } from 'react-redux';

import Component from './mitigation-actions-component';
import { getMitigationActions } from './mitigation-actions-selectors';
import * as actions from './mitigation-actions-actions';

const mapStateToProps = getMitigationActions;

export default connect(mapStateToProps, actions)(Component);
