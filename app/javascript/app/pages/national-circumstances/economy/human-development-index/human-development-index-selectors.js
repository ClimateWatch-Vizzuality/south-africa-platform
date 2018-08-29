import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getHumanIndexDevelopmentIndexData = ({ HumanDevelopmentIndex = {} }) =>
  isEmpty(HumanDevelopmentIndex.data) ? null : HumanDevelopmentIndex.data;

const getChartData = createSelector(getHumanIndexDevelopmentIndexData, data => {
  if (!data) return null;

  return data;
});

export const getHumanDevelopmentIndexData = createStructuredSelector({
  chartData: getChartData
});
