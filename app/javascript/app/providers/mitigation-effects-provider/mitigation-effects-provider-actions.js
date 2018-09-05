import { createAction, createThunkAction } from 'redux-tools';
// import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

import data from './dummy-data.json';

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
      dispatch(fetchMitigationEffectsInit());
      setTimeout(
        () => {
          dispatch(fetchMitigationEffectsReady(data));
        },
        400
      );
      // SAAPI
      //   .get('mitigation/effects', params)
      //   .then((data = {}) => {
      //     dispatch(fetchMitigationEffectsReady(data));
      //   })
      //   .catch(error => {
      //     console.warn(error);
      //     dispatch(fetchMitigationEffectsFail(error && error.message));
      //   });
    }
  }
);
