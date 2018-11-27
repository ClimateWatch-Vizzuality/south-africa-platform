import { createAction } from 'redux-tools';
import { FINANCIAL_RESOURCES } from 'router';

export const updateQueryParam = createAction(FINANCIAL_RESOURCES);
export const updateFiltersSelected = createAction(FINANCIAL_RESOURCES);
