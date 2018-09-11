import * as actions from './gdp-growth-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchGdpGrowthInit]: state => ({ ...state, loading: true }),
  [actions.fetchGdpGrowthReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  }),
  [actions.fetchGdpGrowthFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
