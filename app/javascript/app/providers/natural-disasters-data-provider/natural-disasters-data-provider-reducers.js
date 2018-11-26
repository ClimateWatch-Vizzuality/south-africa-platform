import * as actions from './natural-disasters-data-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchNaturalDisastersDataInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchNaturalDisastersDataReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchNaturalDisastersDataFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
