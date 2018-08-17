import { connect } from 'react-redux';

import { getClimateRisksData } from './climate-risks-selector';

import Component from './climate-risks-component';

const mapStateToProps = getClimateRisksData;

export default connect(mapStateToProps, null)(Component);
