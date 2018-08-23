import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import { getDummyData } from './projected-emissions-selectors';

import Component from './projected-emissions-component';

const mapStateToProps = getDummyData;

const actions = { setModalMetadata };

export default connect(mapStateToProps, actions)(Component);
