import * as actions from './national-circumstances-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchNationalCircumstancesInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchNationalCircumstancesReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchNationalCircumstancesFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
