import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { CWAPI } from 'services/api';

export const fetchCountryOverviewInfoInit = createAction(
  'fetchCountryOverviewInfoInit'
);
export const fetchCountryOverviewInfoReady = createAction(
  'fetchCountryOverviewInfoReady'
);
export const fetchCountryOverviewInfoFail = createAction(
  'fetchCountryOverviewInfoFail'
);

export const fetchCountryOverviewInfo = createThunkAction(
  'fetchCountryOverviewInfo',
  ({ iso }) => (dispatch, state) => {
    const { countriesOverviewData } = state();
    if (isEmpty(countriesOverviewData.data) && !countriesOverviewData.loading) {
      dispatch(fetchCountryOverviewInfoInit());
      CWAPI
        .get(`ndcs/${iso}/content_overview`)
        .then((data = {}) => {
          dispatch(fetchCountryOverviewInfoReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchCountryOverviewInfoFail(error));
        });
    }
  }
);
