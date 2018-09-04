import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getGdpGrowthData = ({ GdpGrowth = {} }) =>
  isEmpty(GdpGrowth.data) ? null : GdpGrowth.data;

const getChartData = createSelector(getGdpGrowthData, data => {
  if (!data) return null;

  return data;
});

export const getGdpGrowth = createStructuredSelector({
  chartData: getChartData
});
