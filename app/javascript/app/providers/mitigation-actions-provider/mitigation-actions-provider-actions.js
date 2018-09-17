import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

export const fetchMitigationActionsInit = createAction(
  'fetchMitigationActionsInit'
);
export const fetchMitigationActionsReady = createAction(
  'fetchMitigationActionsReady'
);
export const fetchMitigationActionsFail = createAction(
  'fetchMitigationActionsFail'
);

export const fetchMitigationActions = createThunkAction(
  'fetchMitigationActions',
  params => (dispatch, state) => {
    const { mitigationActions } = state();
    if (isEmpty(mitigationActions.data) && !mitigationActions.loading) {
      SAAPI
        .get('/mitigation/mitigation_actions', params)
        .then((data = {}) => {
          dispatch(fetchMitigationActionsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchMitigationActionsFail(error && error.message));
        });
    }
  }
);
