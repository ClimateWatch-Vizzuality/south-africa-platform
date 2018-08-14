import * as actions from './overview-country-info-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchCardsOverviewContentInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchCardsOverviewContentReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchCardsOverviewContentFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
