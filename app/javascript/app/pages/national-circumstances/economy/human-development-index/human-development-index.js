import { connect } from 'react-redux';
import Component from './human-development-index-component';
import {
  getHumanDevelopmentIndexData
} from './human-development-index-selectors';

const mapStateToProps = getHumanDevelopmentIndexData;

export default connect(mapStateToProps, null)(Component);
