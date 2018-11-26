import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

export const fetchFinancialResourcesNeededInit = createAction(
  'fetchFinancialResourcesNeededInit'
);
export const fetchFinancialResourcesNeededReady = createAction(
  'fetchFinancialResourcesNeededReady'
);
export const fetchFinancialResourcesNeededFail = createAction(
  'fetchFinancialResourcesNeededFail'
);

export const fetchFinancialResourcesNeeded = createThunkAction(
  'fetchFinancialResourcesNeeded',
  () => (dispatch, state) => {
    const { financialResourcesNeeded } = state();
    if (
      isEmpty(financialResourcesNeeded.data) &&
        !financialResourcesNeeded.loading
    ) {
      SAAPI
        .get('financial_resource/support_needs')
        .then((data = {}) => {
          dispatch(fetchFinancialResourcesNeededReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchFinancialResourcesNeededFail(error && error.message));
        });
    }
  }
);
