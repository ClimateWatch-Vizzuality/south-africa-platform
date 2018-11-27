import { connect } from 'react-redux';
import Component from './flagship-buttons-component';

import { getFlagshipButtons } from './flagship-buttons-selectors';

const mapStateToProps = getFlagshipButtons;

export default connect(mapStateToProps, null)(Component);
