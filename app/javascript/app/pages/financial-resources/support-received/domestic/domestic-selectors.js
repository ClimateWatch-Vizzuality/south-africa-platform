import { createStructuredSelector, createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const CHART_COLORS = { selected: '#f5b335', default: '#ecf0f1' };

const getData = () => null;

// const getData = ({ financialResourcesReceived = {} }) =>
//   isEmpty(financialResourcesReceived.data.data) ? null : financialResourcesReceived.data.data;
const getDomesticIdParam = ({ location }) =>
  location.query ? location.query.domesticId : null;
const setBubbleColor = (selectedId, id) =>
  parseInt(selectedId, 10) === id
    ? CHART_COLORS.selected
    : CHART_COLORS.default;
const getChartData = createSelector([ getData, getDomesticIdParam ], (
  data,
  selectedId
) =>
  {
    if (!data || isEmpty(data)) return null;
    return data.map(e => ({
      ...e,
      color: selectedId
        ? setBubbleColor(selectedId, e.id)
        : CHART_COLORS.default
    }));
  });

export const getDomestic = createStructuredSelector({ data: getChartData });
