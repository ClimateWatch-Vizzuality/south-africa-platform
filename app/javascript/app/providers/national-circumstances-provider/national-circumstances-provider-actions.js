import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { SAAPI } from 'services/api';

export const fetchNationalCircumstancesInit = createAction(
  'fetchNationalCircumstancesInit'
);
export const fetchNationalCircumstancesReady = createAction(
  'fetchNationalCircumstancesReady'
);
export const fetchNationalCircumstancesFail = createAction(
  'fetchNationalCircumstancesFail'
);

export const fetchNationalCircumstances = createThunkAction(
  'fetchNationalCircumstances',
  () => (dispatch, state) => {
    const { nationalCircumstances } = state();
    if (isEmpty(nationalCircumstances.data) && !nationalCircumstances.loading) {
      dispatch(fetchNationalCircumstancesInit());
      SAAPI
        .get('national_circumstance/categories')
        .then((data = {}) => {
          dispatch(fetchNationalCircumstancesReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNationalCircumstancesFail(error && error.message));
        });
    }
  }
);
