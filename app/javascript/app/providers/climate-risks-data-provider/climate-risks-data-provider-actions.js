import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';

import { CWAPI } from 'services/api';

export const fetchClimateRisksDataInit = createAction(
  'fetchClimateRisksDataInit'
);
export const fetchClimateRisksDataReady = createAction(
  'fetchClimateRisksDataReady'
);
export const fetchClimateRisksDataFail = createAction(
  'fetchClimateRisksDataFail'
);

const URL_FOR_CLIMATE_RISKS_DATA = '';

export const fetchClimateRisksData = createThunkAction(
  'fetchClimateRisksData',
  () => (dispatch, state) => {
    const { climateRisksData } = state();
    if (isEmpty(climateRisksData.data) && !climateRisksData.loading) {
      dispatch(fetchClimateRisksDataInit());
      CWAPI
        .get(URL_FOR_CLIMATE_RISKS_DATA)
        .then((data = {}) => {
          dispatch(fetchClimateRisksDataReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchClimateRisksDataFail(error && error.message));
        });
    }
  }
);
