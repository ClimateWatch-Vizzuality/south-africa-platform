import { createAction, createThunkAction } from 'redux-tools';
// import { CWAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';
import data from './data.json';

export const fetchDistributionByAgeInit = createAction(
  'fetchDistributionByAgeInit'
);
export const fetchDistributionByAgeReady = createAction(
  'fetchDistributionByAgeReady'
);
export const fetchDistributionByAgeFail = createAction(
  'fetchDistributionByAgeFail'
);

export const fetchDistributionByAge = createThunkAction(
  'fetchDistributionByAge',
  () => (dispatch, state) => {
    const { DistributionByAge } = state();

    if (isEmpty(DistributionByAge.data) && !DistributionByAge.loading) {
      dispatch(fetchDistributionByAgeInit());
      setTimeout(
        () => {
          dispatch(fetchDistributionByAgeReady(data));
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
