import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

import isEmpty from 'lodash/isEmpty';

export const fetchProjectedEmissionsInit = createAction(
  'fetchProjectedEmissionsInit'
);
export const fetchProjectedEmissionsReady = createAction(
  'fetchProjectedEmissionsReady'
);
export const fetchProjectedEmissionsFail = createAction(
  'fetchProjectedEmissionsFail'
);

export const fetchProjectedEmissions = createThunkAction(
  'fetchProjectedEmissions',
  params => (dispatch, state) => {
    const { ProjectedEmissions } = state();

    if (isEmpty(ProjectedEmissions.data) && !ProjectedEmissions.loading) {
      dispatch(fetchProjectedEmissionsInit());
      CWAPI
        .get('projected_emissions', params)
        .then((data = {}) => {
          dispatch(fetchProjectedEmissionsReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchProjectedEmissionsFail(error && error.message));
        });
    }
  }
);
