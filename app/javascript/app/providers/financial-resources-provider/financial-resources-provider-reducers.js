import * as actions from './financial-resources-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchFinancialResourcesInit]: state => ({ ...state, loading: true }),
  [actions.fetchFinancialResourcesReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchFinancialResourcesFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
