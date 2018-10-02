import { connect } from 'react-redux';

import Component from './flagship-programmes-detail-overview-component';
import * as actions from './flagship-programmes-detail-overview-actions';
import {
  getFlagshipDetailInfo
} from './flagship-programmes-detail-overview-selectors';

const mapStateToProps = getFlagshipDetailInfo;

export default connect(mapStateToProps, actions)(Component);
