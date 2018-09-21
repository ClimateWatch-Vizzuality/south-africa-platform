import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';
import isEmpty from 'lodash/isEmpty';

export const fetchFinancialResourcesReceivedInit = createAction(
  'fetchFinancialResourcesReceivedInit'
);
export const fetchFinancialResourcesReceivedReady = createAction(
  'fetchFinancialResourcesReceivedReady'
);
export const fetchFinancialResourcesReceivedFail = createAction(
  'fetchFinancialResourcesReceivedFail'
);

export const fetchFinancialResourcesReceived = createThunkAction(
  'fetchFinancialResourcesReceived',
  () => (dispatch, state) => {
    const { financialResourcesReceived } = state();
    if (
      isEmpty(financialResourcesReceived.data) &&
        !financialResourcesReceived.loading
    ) {
      SAAPI
        .get('financial_resource/received_supports')
        .then((data = {}) => {
          dispatch(fetchFinancialResourcesReceivedReady(data));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchFinancialResourcesReceivedFail(error && error.message));
        });
    }
  }
);
