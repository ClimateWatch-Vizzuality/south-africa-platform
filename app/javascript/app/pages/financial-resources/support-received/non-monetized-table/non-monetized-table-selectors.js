import { createStructuredSelector, createSelector } from 'reselect';
import { getFocus, getFocusNames } from 'utils/financial-resources';

const getData = createSelector(state => state.data, data => data || null);
const getMeta = createSelector(state => state.meta, meta => meta || null);

const filterData = createSelector(getData, data => {
  if (!data) return null;
  return data;
});

const addFocusToData = createSelector([ filterData, getMeta ], (data, meta) => {
  if (!data) return null;
  const focusNames = getFocusNames(meta);
  return data.map(d => ({
    focus: getFocus(d, focusNames),
    donor: d.donor.name,
    purpose: d.purposeFunds,
    timeframe: d.timeframes
  }));
});

const getTableData = createSelector(addFocusToData, data => {
  if (!data) return null;
  return { data, defaultColumns: [ 'donor', 'focus', 'purpose', 'timeframe' ] };
});

export const getNonMonetizedData = createStructuredSelector({
  tableData: getTableData
});
