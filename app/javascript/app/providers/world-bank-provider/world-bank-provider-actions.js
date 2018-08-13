import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

import isEmpty from 'lodash/isEmpty';

export const fetchWorldBankInit = createAction('fetchWorldBankInit');
export const fetchWorldBankReady = createAction('fetchWorldBankReady');
export const fetchWorldBankFail = createAction('fetchWorldBankFail');

export const fetchWorldBank = createThunkAction('fetchWorldBank', ({ iso }) =>
  (dispatch, state) => {
    const { WorldBankData } = state();
    if (isEmpty(WorldBankData.data) && !WorldBankData.loading) {
      dispatch(fetchWorldBankInit());
      CWAPI
        .get(`wb_extra/${iso}`)
        .then(data => {
          if (data) {
            dispatch(fetchWorldBankReady({ data, iso }));
          } else {
            dispatch(fetchWorldBankReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchWorldBankFail(error));
        });
    }
  });
