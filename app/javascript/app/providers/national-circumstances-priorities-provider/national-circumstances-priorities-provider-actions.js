import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { SAAPI } from 'services/api';

export const fetchNationalCircumstancesPrioritiesInit = createAction(
  'fetchNationalCircumstancesPrioritiesInit'
);
export const fetchNationalCircumstancesPrioritiesReady = createAction(
  'fetchNationalCircumstancesPrioritiesReady'
);
export const fetchNationalCircumstancesPrioritiesFail = createAction(
  'fetchNationalCircumstancesPrioritiesFail'
);

export const fetchNationalCircumstancesPriorities = createThunkAction(
  'fetchNationalCircumstancesPriorities',
  () => (dispatch, state) => {
    const { nationalCircumstancesPriorities } = state();
    if (
      isEmpty(nationalCircumstancesPriorities.data) &&
        !nationalCircumstancesPriorities.loading
    ) {
      dispatch(fetchNationalCircumstancesPrioritiesInit());
      SAAPI
        .get('national_circumstance/priorities')
        .then((data = {}) => {
          dispatch(fetchNationalCircumstancesPrioritiesReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(
            fetchNationalCircumstancesPrioritiesFail(error && error.message)
          );
        });
    }
  }
);
