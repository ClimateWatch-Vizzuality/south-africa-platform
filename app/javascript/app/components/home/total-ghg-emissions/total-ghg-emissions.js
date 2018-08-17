import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import Component from './total-ghg-emissions-component';
import { getTotalGHGEMissions } from './total-ghg-emissions-selectors';
import * as ownActions from './total-ghg-emissions-actions';

const actions = { ...ownActions, setModalMetadata };

const mapStateToProps = getTotalGHGEMissions;

export default connect(mapStateToProps, actions)(Component);
