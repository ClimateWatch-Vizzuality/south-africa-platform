import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from './provincial-actions';

import ProvincialComponent from './provincial-component';
import { getProvincial } from './provincial-selectors';

const mapStateToProps = getProvincial;

export default connect(mapStateToProps, actions)(ProvincialComponent);
