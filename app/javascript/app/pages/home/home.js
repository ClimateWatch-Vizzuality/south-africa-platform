import { connect } from 'react-redux';
import { getCardsData } from './home-selectors';

import HomeComponent from './home-component';

const mapStateToProps = state => {
  const cardsData = getCardsData();
  return { state, cardsData };
};

export default connect(mapStateToProps, null)(HomeComponent);
