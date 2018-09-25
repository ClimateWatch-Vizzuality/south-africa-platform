import { createStructuredSelector, createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const CHART_COLORS = { selected: '#f5b335', default: '#ecf0f1' };

const getData = createSelector(state => state.data, data => data || null);
const getComparisonId = createSelector([ state => state.location, getData ], (
  location,
  data
) =>
  {
    if (!data || !location) return null;
    return location.query && location.query.comparisonId || data[0].id;
  });

const setBubbleColor = (selectedId, id) =>
  parseInt(selectedId, 10) === id
    ? CHART_COLORS.selected
    : CHART_COLORS.default;

const getChartData = createSelector([ getData, getComparisonId ], (
  data,
  selectedId
) =>
  {
    if (!data || isEmpty(data)) return null;
    return data.map(e => ({
      ...e,
      value: e.amountUsd,
      unit: 'Dollars',
      color: selectedId
        ? setBubbleColor(selectedId, e.id)
        : CHART_COLORS.default
    }));
  });

const getSelectedDataInfo = createSelector([ getChartData, getComparisonId ], (
  data,
  selectedId
) =>
  {
    if (!data || !selectedId) return null;
    return data.find(d => d.id === parseInt(selectedId, 10));
  });

export const getComparison = data =>
  createStructuredSelector({
    data: () => getChartData(data),
    selectedData: () => getSelectedDataInfo(data)
  });
