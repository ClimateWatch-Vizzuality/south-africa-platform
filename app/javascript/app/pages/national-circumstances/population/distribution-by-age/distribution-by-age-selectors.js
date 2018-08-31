import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getDistributionByAgeData = ({ DistributionByAge = {} }) =>
  isEmpty(DistributionByAge.data) ? null : DistributionByAge.data;

const getBarChartData = createSelector(getDistributionByAgeData, data => {
  if (!data) return null;

  return data;
});

export const getDummyData = createStructuredSelector({
  barChartData: getBarChartData
});
