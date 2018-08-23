import { connect } from 'react-redux';

import Component from './mitigation-actions-component';
import { getGHGInventory } from './mitigation-actions-selectors';
import * as actions from './mitigation-actions-actions';

const mapStateToProps = getGHGInventory;

export default connect(mapStateToProps, actions)(Component);
