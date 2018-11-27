import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from './economy-actions';

import Component from './economy-component';
import { getEconomy } from './economy-selectors';

const mapStateToProps = getEconomy;

export default connect(mapStateToProps, actions)(Component);
