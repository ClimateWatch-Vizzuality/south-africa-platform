import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

export const fetchGHGInventoryInit = createAction('fetchGHGInventoryInit');
export const fetchGHGInventoryReady = createAction('fetchGHGInventoryReady');
export const fetchGHGInventoryFail = createAction('fetchGHGInventoryFail');

export const fetchGHGInventory = createThunkAction('fetchGHGInventory', () =>
  (dispatch, state) => {
    const { GHGInventory } = state();
    if (isEmpty(GHGInventory.data) && !GHGInventory.loading) {
      SAAPI
        .get('inventory_improvement_projects')
        .then((data = {}) => {
          dispatch(fetchGHGInventoryReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGHGInventoryFail(error && error.message));
        });
    }
  });
