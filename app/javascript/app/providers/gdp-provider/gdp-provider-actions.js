import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

import isEmpty from 'lodash/isEmpty';

export const fetchGdpInit = createAction('fetchGdpInit');
export const fetchGdpReady = createAction('fetchGdpReady');
export const fetchGdpFail = createAction('fetchGdpFail');

export const fetchGdp = createThunkAction('fetchGdp', params =>
  (dispatch, state) => {
    const { GDP } = state();
    if (isEmpty(GDP.data) && !GDP.loading) {
      dispatch(fetchGdpInit());
      CWAPI
        .get('emissions', params)
        .then((data = {}) => {
          dispatch(fetchGdpReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGdpFail(error && error.message));
        });
    }
  });
