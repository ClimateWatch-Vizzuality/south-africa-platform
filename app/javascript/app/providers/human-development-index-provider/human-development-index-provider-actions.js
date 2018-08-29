import { createAction, createThunkAction } from 'redux-tools';
// import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

import data from './dummy.json';

export const fetchHumanDevelopmentIndexInit = createAction(
  'fetchHumanDevelopmentIndexInit'
);
export const fetchHumanDevelopmentIndexReady = createAction(
  'fetchHumanDevelopmentIndexReady'
);
export const fetchHumanDevelopmentIndexFail = createAction(
  'fetchHumanDevelopmentIndexFail'
);

export const fetchHumanDevelopmentIndex = createThunkAction(
  'fetchHumanDevelopmentIndex',
  () => (dispatch, state) => {
    const { HumanDevelopmentIndex } = state();
    if (isEmpty(HumanDevelopmentIndex.data) && !HumanDevelopmentIndex.loading) {
      dispatch(fetchHumanDevelopmentIndexInit());
      setTimeout(
        () => {
          dispatch(fetchHumanDevelopmentIndexReady(data));
        },
        400
      );
      // SAAPI
      //   .get('ghg/emissions/inventory', params)
      //   .then((data = {}) => {
      //     dispatch(fetchGHGInventoryReady(data));
      //   })
      //   .catch(error => {
      //     console.warn(error);
      //     dispatch(fetchGHGInventoryFail(error && error.message));
      //   });
    }
  }
);
