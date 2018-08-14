import * as actions from './overview-country-info-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchCountryOverviewInfoInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchCountryOverviewInfoReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchCountryOverviewInfoFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
