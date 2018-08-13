import { connect } from 'react-redux';

import Component from './total-ghg-emissions-component';
import { getTotalGHGEMissions } from './total-ghg-emissions-selectors';

const mapStateToProps = getTotalGHGEMissions;

export default connect(mapStateToProps, null)(Component);
