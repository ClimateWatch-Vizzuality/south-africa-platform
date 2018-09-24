import { connect } from 'react-redux';
import {
  updateFilters
} from 'providers/projected-emissions-provider/projected-emissions-provider-actions';

import { getDummyData } from './projected-emissions-selectors';

import Component from './projected-emissions-component';

const mapStateToProps = getDummyData;

const actions = { updateFilters };

export default connect(mapStateToProps, actions)(Component);
