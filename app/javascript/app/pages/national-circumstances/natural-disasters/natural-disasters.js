import { connect } from 'react-redux';

import { getNaturalDisastersData } from './natural-disasters-selector';

import Component from './natural-disasters-component';

const mapStateToProps = getNaturalDisastersData;

export default connect(mapStateToProps, null)(Component);
