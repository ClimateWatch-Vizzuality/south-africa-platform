import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { CWAPI } from 'services/api';

export const fetchNaturalDisastersDataInit = createAction(
  'fetchNaturalDisastersDataInit'
);
export const fetchNaturalDisastersDataReady = createAction(
  'fetchNaturalDisastersDataReady'
);
export const fetchNaturalDisastersDataFail = createAction(
  'fetchNaturalDisastersDataFail'
);

const URL_FOR_CLIMATE_RISKS_DATA = '';

export const fetchNaturalDisastersData = createThunkAction(
  'fetchNaturalDisastersData',
  () => (dispatch, state) => {
    const { naturalDisastersData } = state();
    if (isEmpty(naturalDisastersData.data) && !naturalDisastersData.loading) {
      dispatch(fetchNaturalDisastersDataInit());
      CWAPI
        .get(URL_FOR_CLIMATE_RISKS_DATA)
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
