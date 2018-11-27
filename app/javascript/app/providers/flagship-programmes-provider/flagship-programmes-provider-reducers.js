import * as actions from './flagship-programmes-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchFlagshipProgrammesInit]: state => ({ ...state, loading: true }),
  [actions.fetchFlagshipProgrammesReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchFlagshipProgrammesFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
