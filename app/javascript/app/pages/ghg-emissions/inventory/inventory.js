import { connect } from 'react-redux';

import Component from './inventory-component';
import { getGHGInventory } from './inventory-selectors';
import * as actions from './inventory-actions';

const mapStateToProps = getGHGInventory;

export default connect(mapStateToProps, actions)(Component);
