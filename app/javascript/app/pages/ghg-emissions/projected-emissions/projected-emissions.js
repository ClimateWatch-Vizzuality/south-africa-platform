import { connect } from 'react-redux';
import {
  updateFilters
} from 'providers/projected-emissions-provider/projected-emissions-provider-actions';

import { getData } from './projected-emissions-selectors';

import Component from './projected-emissions-component';

const actions = { updateFilters };

export default connect(getData, actions)(Component);
