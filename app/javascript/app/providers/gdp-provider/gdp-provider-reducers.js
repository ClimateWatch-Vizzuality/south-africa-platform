import * as actions from './gdp-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchGdpInit]: state => ({ ...state, loading: true }),
  [actions.fetchGdpReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchGdpFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
