import { connect } from 'react-redux';
import Component from './international-component';
import { getInternational } from './international-selectors';

const mapStateToProps = (state, props) => getInternational(props);

export default connect(mapStateToProps, null)(Component);
