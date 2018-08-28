import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from './economy-actions';

import Component from './economy-component';
// import { getProvincial } from './provincial-selectors';
// const mapStateToProps = getProvincial;
export default connect(null, actions)(Component);
