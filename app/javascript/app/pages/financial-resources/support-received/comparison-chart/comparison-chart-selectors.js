import { createStructuredSelector, createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { getFocus, getFocusNames } from 'utils/financial-resources';
import has from 'lodash/has';

const CHART_COLORS = { selected: '#f5b335', default: '#ecf0f1' };

const selectData = (state, props) => props.data || null;
const selectMeta = state =>
  has(state, 'financialResourcesReceived.data.meta') &&
    state.financialResourcesReceived.data.meta;

const getComparisonId = createSelector(
  [ state => state.location, selectData ],
  (location, data) => {
    if (!data || isEmpty(data) || !location) return null;
    return location.query && location.query.comparisonId || data[0].id;
  }
);

const setBubbleColor = (selectedId, id) =>
  parseInt(selectedId, 10) === id
    ? CHART_COLORS.selected
    : CHART_COLORS.default;

const getChartData = createSelector([ selectData, getComparisonId ], (
  data,
  selectedId
) =>
  {
    if (!data || isEmpty(data)) return null;
    const unit = 'USD million';
    return data.map(e => ({
      ...e,
      value: e.amountUsd,
      unit,
      tooltipContent: [ e.donor.name, `${e.amountUsd} ${unit}` ],
      color: selectedId
        ? setBubbleColor(selectedId, e.id)
        : CHART_COLORS.default
    }));
  });

const getSelectedDataInfo = createSelector(
  [ getChartData, selectMeta, getComparisonId ],
  (data, meta, selectedId) => {
    if (!data || !selectedId) return null;
    const selectedData = data.find(d => d.id === parseInt(selectedId, 10));
    const focus = getFocus(selectedData, getFocusNames(meta));
    return { ...selectedData, focus };
  }
);

export const getComparison = createStructuredSelector({
  data: getChartData,
  selectedData: getSelectedDataInfo
});
