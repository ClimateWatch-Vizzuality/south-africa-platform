import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { SAAPI } from 'services/api';

export const fetchNaturalDisastersDataInit = createAction(
  'fetchNaturalDisastersDataInit'
);
export const fetchNaturalDisastersDataReady = createAction(
  'fetchNaturalDisastersDataReady'
);
export const fetchNaturalDisastersDataFail = createAction(
  'fetchNaturalDisastersDataFail'
);

export const fetchNaturalDisastersData = createThunkAction(
  'fetchNaturalDisastersData',
  () => (dispatch, state) => {
    const { naturalDisastersData } = state();
    if (isEmpty(naturalDisastersData.data) && !naturalDisastersData.loading) {
      dispatch(fetchNaturalDisastersDataInit());
      SAAPI
        .get('national_circumstance/priorities')
        .then((data = {}) => {
          dispatch(fetchNaturalDisastersDataReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchNaturalDisastersDataFail(error && error.message));
        });
    }
  }
);
