import { connect } from 'react-redux';
import { getNaturalDisastersData } from './natural-disasters-selector';
import Component from './natural-disasters-component';

export default connect(getNaturalDisastersData, null)(Component);
