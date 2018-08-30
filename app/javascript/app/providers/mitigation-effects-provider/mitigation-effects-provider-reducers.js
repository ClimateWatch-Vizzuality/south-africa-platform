import * as actions from './mitigation-effects-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchMitigationEffectsInit]: state => ({ ...state, loading: true }),
  [actions.fetchMitigationEffectsReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchMitigationEffectsFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
