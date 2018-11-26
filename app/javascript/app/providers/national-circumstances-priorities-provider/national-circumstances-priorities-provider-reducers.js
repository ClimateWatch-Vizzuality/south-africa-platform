import * as actions from './national-circumstances-priorities-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchNationalCircumstancesPrioritiesInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchNationalCircumstancesPrioritiesReady]: (
    state,
    { payload }
  ) => ({ ...state, loading: false, data: payload }),
  [actions.fetchNationalCircumstancesPrioritiesFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
