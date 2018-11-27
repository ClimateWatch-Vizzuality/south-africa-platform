import { connect } from 'react-redux';

import Component from './overview-component';
import * as actions from './overview-actions';
import { getFlagshipDetailInfo } from './overview-selectors';

const mapStateToProps = getFlagshipDetailInfo;

export default connect(mapStateToProps, actions)(Component);
