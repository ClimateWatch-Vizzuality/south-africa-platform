import { connect } from 'react-redux';
import Component from './international-component';
import { getInternational } from './international-selectors';

const mapStateToProps = getInternational;

export default connect(mapStateToProps, null)(Component);
