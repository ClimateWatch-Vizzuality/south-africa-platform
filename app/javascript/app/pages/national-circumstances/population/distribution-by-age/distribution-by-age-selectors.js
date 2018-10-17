import { createSelector, createStructuredSelector } from 'reselect';
import has from 'lodash/has';

const selectNationalCircumstancesData = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const selectNationalCircumstancesMeta = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.meta'))
    return null;
  return nationalCircumstances.data.meta;
};

const getLoading = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || nationalCircumstances.loading) return true;
  return false;
};

const getDistributionByAgeData = createSelector(
  [ selectNationalCircumstancesData, selectNationalCircumstancesMeta ],
  (data, meta) => {
    if (!data || !meta) return null;
    const updatedData = [];
    data.forEach(d => {
      if (d.name.startsWith('pop_age')) {
        const metaData = meta.find(m => m.code === d.name);
        updatedData.push({
          x: metaData.category,
          categoryYears: d.categoryYears
        });
      }
    });
    return updatedData;
  }
);

const selectYear = (state, { yearSelected }) =>
  yearSelected && yearSelected.value || null;

const getBarChartData = createSelector(
  [ getDistributionByAgeData, selectYear, getLoading ],
  (data, year, loading) => {
    if (!data) return null;
    const selectedData = [];
    data.forEach(d => {
      const yearData = d.categoryYears.find(y => String(y.year) === year);
      if (yearData && yearData.value) {
        selectedData.push({ x: d.x, y: yearData && yearData.value });
      }
    });
    return {
      data: selectedData,
      loading,
      domain: { x: [ 'auto', 'auto' ], y: [ 0, 'auto' ] },
      config: {
        axes: {
          xBottom: { name: 'Age distribution', unit: '', format: 'string' },
          yLeft: { name: 'Number of people', unit: '', format: 'number' }
        },
        tooltip: { y: { label: 'people' } },
        animation: false,
        columns: {
          x: [ { label: 'year', value: 'x' } ],
          y: [ { label: '', value: 'y' } ]
        },
        theme: { y: { stroke: '', fill: '#f5b335' } }
      }
    };
  }
);

export const getDummyData = createStructuredSelector({
  barChartData: getBarChartData,
  loading: getLoading
});
