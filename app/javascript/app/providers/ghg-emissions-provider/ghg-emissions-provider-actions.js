import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

import isEmpty from 'lodash/isEmpty';

export const fetchGHGEmissionsInit = createAction('fetchGHGEmissionsInit');
export const fetchGHGEmissionsReady = createAction('fetchGHGEmissionsReady');
export const fetchGHGEmissionsFail = createAction('fetchGHGEmissionsFail');

export const fetchGHGEmissions = createThunkAction(
  'fetchGHGEmissions',
  params => (dispatch, state) => {
    const { GHGEmissions } = state();
    if (isEmpty(GHGEmissions.data) && !GHGEmissions.loading) {
      dispatch(fetchGHGEmissionsInit());
      CWAPI
        .get('emissions', params)
        .then((data = {}) => {
          dispatch(fetchGHGEmissionsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGHGEmissionsFail(error));
        });
    }
  }
);
