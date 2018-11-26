import * as actions from './ghg-inventory-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchGHGInventoryInit]: state => ({ ...state, loading: true }),
  [actions.fetchGHGInventoryReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchGHGInventoryFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
