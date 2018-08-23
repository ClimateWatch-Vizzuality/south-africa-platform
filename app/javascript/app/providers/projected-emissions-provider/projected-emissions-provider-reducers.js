import * as actions from './projected-emissions-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchProjectedEmissionsInit]: state => ({ ...state, loading: true }),
  [actions.fetchProjectedEmissionsReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchProjectedEmissionsFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  }),
  [actions.updateFilters]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: { ...state.data, ...payload }
  })
};
