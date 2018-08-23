import { createAction, createThunkAction } from 'redux-tools';
// import { CWAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';
import data from './dummy-data.json';

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
  () => (dispatch, state) => {
    const { ProjectedEmissions } = state();

    if (isEmpty(ProjectedEmissions.data) && !ProjectedEmissions.loading) {
      dispatch(fetchProjectedEmissionsInit());
      setTimeout(
        () => {
          dispatch(fetchProjectedEmissionsReady(data));
        },
        400
      );
      // CWAPI
      //   .get('projected_emissions', params)
      //   .then((data = {}) => {
      //     dispatch(fetchProjectedEmissionsReady(data));
      //   })
      //   .catch(error => {
      //     console.warn(error);
      //     dispatch(fetchProjectedEmissionsFail(error && error.message));
      //   });
    }
  }
);
