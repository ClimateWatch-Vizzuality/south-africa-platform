import { createAction } from 'redux-tools';
import { MITIGATIONS } from 'router';

export const updateFiltersSelected = createAction(MITIGATIONS);
