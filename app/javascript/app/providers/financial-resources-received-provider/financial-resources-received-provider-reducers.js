import * as actions from './financial-resources-received-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchFinancialResourcesReceivedInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchFinancialResourcesReceivedReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchFinancialResourcesReceivedFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
