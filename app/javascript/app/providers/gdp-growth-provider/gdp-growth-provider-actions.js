import { createAction, createThunkAction } from 'redux-tools';
// import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

import data from './dummy.json';

export const fetchGdpGrowthInit = createAction('fetchGdpGrowthInit');
export const fetchGdpGrowthReady = createAction('fetchGdpGrowthReady');
export const fetchGdpGrowthFail = createAction('fetchGdpGrowthFail');

export const fetchGdpGrowth = createThunkAction('fetchGdpGrowth', () =>
  (dispatch, state) => {
    const { GdpGrowth } = state();
    if (isEmpty(GdpGrowth.data) && !GdpGrowth.loading) {
      dispatch(fetchGdpGrowthInit());
      setTimeout(
        () => {
          dispatch(fetchGdpGrowthReady(data));
        },
        400
      );
      // SAAPI
      //   .get('ghg/emissions/inventory', params)
      //   .then((data = {}) => {
      //     dispatch(fetchGHGInventoryReady(data));
      //   })
      //   .catch(error => {
      //     console.warn(error);
      //     dispatch(fetchGHGInventoryFail(error && error.message));
      //   });
    }
  });
