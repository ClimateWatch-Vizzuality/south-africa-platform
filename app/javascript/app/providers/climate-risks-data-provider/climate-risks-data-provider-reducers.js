import * as actions from './climate-risks-data-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchClimateRisksDataInit]: state => ({ ...state, loading: true }),
  [actions.fetchClimateRisksDataReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload
  }),
  [actions.fetchClimateRisksDataFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
