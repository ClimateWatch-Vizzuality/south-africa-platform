import { connect } from 'react-redux';

import Component from './flagship-programmes-detail-overview-component';
import {
  getFlagshipDetailInfo
} from './flagship-programmes-detail-overview-selectors';
// import * as actions from './flagship-programmes-detail-overview-actions';
const mapStateToProps = getFlagshipDetailInfo;

export default connect(mapStateToProps, null)(Component);
