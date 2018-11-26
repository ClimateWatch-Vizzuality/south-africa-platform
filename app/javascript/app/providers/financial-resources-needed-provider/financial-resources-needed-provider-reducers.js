import * as actions from './financial-resources-needed-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchFinancialResourcesNeededInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchFinancialResourcesNeededReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchFinancialResourcesNeededFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
