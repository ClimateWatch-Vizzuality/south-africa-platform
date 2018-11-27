import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

export const fetchMitigationEffectsInit = createAction(
  'fetchMitigationEffectsInit'
);
export const fetchMitigationEffectsReady = createAction(
  'fetchMitigationEffectsReady'
);
export const fetchMitigationEffectsFail = createAction(
  'fetchMitigationEffectsFail'
);

export const fetchMitigationEffects = createThunkAction(
  'fetchMitigationEffects',
  () => (dispatch, state) => {
    const { mitigationEffects } = state();
    if (isEmpty(mitigationEffects.data) && !mitigationEffects.loading) {
      SAAPI
        .get('mitigation/mitigation_effects')
        .then((data = {}) => {
          dispatch(fetchMitigationEffectsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchMitigationEffectsFail(error && error.message));
        });
    }
  }
);
