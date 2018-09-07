import { createAction, createThunkAction } from 'redux-tools';
// import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

import data from './dummy-data.json';

export const fetchFinancialResourcesInit = createAction(
  'fetchFinancialResourcesInit'
);
export const fetchFinancialResourcesReady = createAction(
  'fetchFinancialResourcesReady'
);
export const fetchFinancialResourcesFail = createAction(
  'fetchFinancialResourcesFail'
);

export const fetchFinancialResources = createThunkAction(
  'fetchFinancialResources',
  () => (dispatch, state) => {
    const { financialResources } = state();
    if (isEmpty(financialResources.data) && !financialResources.loading) {
      dispatch(fetchFinancialResourcesInit());
      setTimeout(
        () => {
          dispatch(fetchFinancialResourcesReady(data));
        },
        400
      );
      // SAAPI
      //   .get('mitigation/effects', params)
      //   .then((data = {}) => {
      //     dispatch(fetchFinancialResourcesReady(data));
      //   })
      //   .catch(error => {
      //     console.warn(error);
      //     dispatch(fetchFinancialResourcesFail(error && error.message));
      //   });
    }
  }
);
