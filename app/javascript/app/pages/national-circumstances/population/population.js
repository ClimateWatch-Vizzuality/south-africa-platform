import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from './population-actions';

import PopulationComponent from './population-component';
import { getPopulation } from './population-selectors';

const mapStateToProps = getPopulation;

export default connect(mapStateToProps, actions)(PopulationComponent);
