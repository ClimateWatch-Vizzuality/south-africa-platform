import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';

export const fetchGHGEmissionsInit = createAction('fetchGHGEmissionsInit');
export const fetchGHGEmissionsReady = createAction('fetchGHGEmissionsReady');
export const fetchGHGEmissionsFail = createAction('fetchGHGEmissionsFail');

export const fetchGHGEmissions = createThunkAction(
  'fetchGHGEmissions',
  params => (dispatch, state) => {
    const { GHGEmissions } = state();
    if (!GHGEmissions.loading) {
      dispatch(fetchGHGEmissionsInit());
      SAAPI
        .get('emissions', params)
        .then((data = {}) => {
          dispatch(
            fetchGHGEmissionsReady(data['historicalEmissions::Records'])
          );
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGHGEmissionsFail(error && error.message));
        });
    }
  }
);
