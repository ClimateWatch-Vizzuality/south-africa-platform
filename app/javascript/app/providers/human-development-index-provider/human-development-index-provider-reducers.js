import * as actions from './human-development-index-provider-actions';

export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

export default {
  [actions.fetchHumanDevelopmentIndexInit]: state => ({
    ...state,
    loading: true
  }),
  [actions.fetchHumanDevelopmentIndexReady]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  }),
  [actions.fetchHumanDevelopmentIndexFail]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })
};
