import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import Component from './gdp-component';
import { getGdp } from './gdp-selectors';
import * as ownActions from './gdp-actions';

const actions = { ...ownActions, setModalMetadata };

const mapStateToProps = getGdp;

export default connect(mapStateToProps, actions)(Component);
