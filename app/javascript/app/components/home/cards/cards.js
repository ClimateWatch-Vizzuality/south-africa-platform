import { connect } from 'react-redux';
import { getCardsData } from './cards-selectors';

import CardsComponent from './cards-component';

const mapStateToProps = ({ countriesOverviewData }) => {
  const cardsData = getCardsData(countriesOverviewData);
  return { cardsData };
};

export default connect(mapStateToProps, null)(CardsComponent);
