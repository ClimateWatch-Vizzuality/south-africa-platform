import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

export const fetchFlagshipProgrammesInit = createAction(
  'fetchFlagshipProgrammesInit'
);
export const fetchFlagshipProgrammesReady = createAction(
  'fetchFlagshipProgrammesReady'
);
export const fetchFlagshipProgrammesFail = createAction(
  'fetchFlagshipProgrammesFail'
);

export const fetchFlagshipProgrammes = createThunkAction(
  'fetchFlagshipProgrammes',
  () => (dispatch, state) => {
    const { flagshipProgrammes } = state();

    if (isEmpty(flagshipProgrammes.data) && !flagshipProgrammes.loading) {
      dispatch(fetchFlagshipProgrammesInit());
      SAAPI
        .get('mitigation/flagship_programmes')
        .then((data = {}) => {
          dispatch(fetchFlagshipProgrammesReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchFlagshipProgrammesFail(error && error.message));
        });
    }
  }
);
