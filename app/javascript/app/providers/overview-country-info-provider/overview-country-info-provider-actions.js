import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { CWAPI } from 'services/api';

export const fetchCardsOverviewContentInit = createAction(
  'fetchCardsOverviewContentInit'
);
export const fetchCardsOverviewContentReady = createAction(
  'fetchCardsOverviewContentReady'
);
export const fetchCardsOverviewContentFail = createAction(
  'fetchCardsOverviewContentFail'
);

export const fetchCardsOverviewContent = createThunkAction(
  'fetchCardsOverviewContent',
  ({ iso }) => (dispatch, state) => {
    const { countriesOverviewData } = state();
    if (isEmpty(countriesOverviewData.data) && !countriesOverviewData.loading) {
      dispatch(fetchCardsOverviewContentInit());
      CWAPI
        .get(`ndcs/${iso}/content_overview`)
        .then((data = {}) => {
          dispatch(fetchCardsOverviewContentReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchCardsOverviewContentFail(error));
        });
    }
  }
);
