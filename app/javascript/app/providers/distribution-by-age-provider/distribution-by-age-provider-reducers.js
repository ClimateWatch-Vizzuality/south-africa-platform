import * as actions from './distribution-by-age-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchDistributionByAgeInit]: state => ({ ...state, loading: true }),
  [actions.fetchDistributionByAgeReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchDistributionByAgeFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
