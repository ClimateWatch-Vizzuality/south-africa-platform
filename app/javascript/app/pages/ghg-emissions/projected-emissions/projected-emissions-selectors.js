import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getProjectedEmissionsData = ({ ProjectedEmissions = {} }) =>
  isEmpty(ProjectedEmissions.data) ? null : ProjectedEmissions.data;

const getProjectedEmissions = createSelector(
  getProjectedEmissionsData,
  projectedEmissions => projectedEmissions
);

// const getChartLoading = ({ ProjectedEmissions = {} }) => ProjectedEmissions.loading;
const getChartData = createSelector(getProjectedEmissions, data => {
  if (!data) return null;
  return { ...data };
});

export const getDummyData = createStructuredSelector({
  chartData: getChartData
});
