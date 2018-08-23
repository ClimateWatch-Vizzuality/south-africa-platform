import { createStructuredSelector } from 'reselect';
import dummyData from './dummy-data';

// data for the graph
// const getProjectedEmissionsData = ({ ProjectedEmissions }) => {
//   return isEmpty(ProjectedEmissions.data) ? null : ProjectedEmissions.data;
// };
// const getChartConfig = createSelector(
//   [ getProjectedEmissionsData ],
//   (data) => {
//     if (!data) return null;
//     const { config } = data;
//     return {
//       config
//     };
//   }
// );
// const getChartDataValues = createSelector(
//   [getProjectedEmissionsData],
//   ({ data }) => {
//     if (!data) return null;
//     return {
//       data
//     }
//   }
// );
// const getChartDomain = createSelector(
//   [getProjectedEmissionsData],
//   ({ domain }) => {
//     if(!domain) return null;
//     return {
//       domain
//     }
//   }
// );
// const getFiltersOptions = createSelector(
//   [getProjectedEmissionsData],
//   ({ filters }) => {
//     if(!filters) return null;
//     return {
//       filters
//     }
//   }
// )
// const getFiltersSelected = createSelector(
//   [getProjectedEmissionsData],
//   ({ filtersSelected }) => {
//     if(!filtersSelected) return null;
//     return {
//       filtersSelected
//     }
//   }
// )
// const getChartLoading = ({ ProjectedEmissions = {} }) => ProjectedEmissions.loading;
export const getChartData = createStructuredSelector({
  config: () => dummyData.config,
  initialLineWithDotsColumns: () => dummyData.initialLineWithDotsColumns,
  initialRangedAreaColumns: () => dummyData.initialRangedAreaColumns,
  initialDotsColumns: () => dummyData.initialDotsColumns,
  initialLineColumns: () => dummyData.initialLineColumns,
  data: () => dummyData.data,
  domain: () => dummyData.domain,
  dataOptions: () => dummyData.filters,
  dataSelected: () => dummyData.filtersSelected
});

// const getChartData = createStructuredSelector({
//   config: getChartConfig,
//   data: getChartDataValues,
//   domain: getChartDomain,
//   dataOptions: getFiltersOptions,
//   dataSelected: getFiltersSelected,
//   loading: getChartLoading
// })
export const getDummyData = createStructuredSelector({
  chartData: getChartData
});
