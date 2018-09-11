import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import Component from './human-development-index-component';
import {
  getHumanDevelopmentIndexData
} from './human-development-index-selectors';

const actions = { setModalMetadata };

const mapStateToProps = getHumanDevelopmentIndexData;

export default connect(mapStateToProps, actions)(Component);
