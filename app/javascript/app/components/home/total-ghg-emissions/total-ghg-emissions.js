import { connect } from 'react-redux';

import Component from './total-ghg-emissions-component';
import { getTotalGHGEMissions } from './total-ghg-emissions-selectors';
import * as actions from './total-ghg-emissions-actions';

const mapStateToProps = getTotalGHGEMissions;

export default connect(mapStateToProps, actions)(Component);
