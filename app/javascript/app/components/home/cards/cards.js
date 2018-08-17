import { connect } from 'react-redux';
import { getCardsData } from './cards-selectors';

import CardsComponent from './cards-component';

const mapStateToProps = getCardsData;

export default connect(mapStateToProps, null)(CardsComponent);
