import * as actions from './ghg-meta-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchGHGMetaInit]: state => ({ ...state, loading: true }),
  [actions.fetchGHGMetaReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchGHGMetaFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
