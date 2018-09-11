import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import Component from './gdp-growth-component';
import { getGdpGrowth } from './gdp-growth-selectors';

const actions = { setModalMetadata };

const mapStateToProps = getGdpGrowth;

export default connect(mapStateToProps, actions)(Component);
