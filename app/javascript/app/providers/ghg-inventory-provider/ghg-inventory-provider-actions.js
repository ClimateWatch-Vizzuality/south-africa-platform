import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';

import isEmpty from 'lodash/isEmpty';

export const fetchGHGInventoryInit = createAction('fetchGHGInventoryInit');
export const fetchGHGInventoryReady = createAction('fetchGHGInventoryReady');
export const fetchGHGInventoryFail = createAction('fetchGHGInventoryFail');

export const fetchGHGInventory = createThunkAction(
  'fetchGHGInventory',
  params => (dispatch, state) => {
    const { GHGInventory } = state();
    if (isEmpty(GHGInventory.data) && !GHGInventory.loading) {
      dispatch(fetchGHGInventoryInit());
      SAAPI
        .get('ghg/emissions/inventory', params)
        .then((data = {}) => {
          dispatch(fetchGHGInventoryReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGHGInventoryFail(error && error.message));
        });
    }
  }
);
