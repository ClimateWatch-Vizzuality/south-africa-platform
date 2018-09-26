import * as actions from './mitigation-actions-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchMitigationActionsInit]: state => ({ ...state, loading: true }),
  [actions.fetchMitigationActionsReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchMitigationActionsFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
