import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
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
  () => (dispatch, state) => {
    const { projectedEmissions } = state();

    if (isEmpty(projectedEmissions.data) && !projectedEmissions.loading) {
      dispatch(fetchProjectedEmissionsInit());
      SAAPI
        .get('ghg/projected_emissions')
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
