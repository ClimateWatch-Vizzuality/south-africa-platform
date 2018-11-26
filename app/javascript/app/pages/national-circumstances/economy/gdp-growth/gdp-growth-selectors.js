import { createSelector, createStructuredSelector } from 'reselect';
import has from 'lodash/has';

const selectNationalCircumstances = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const filterGDPGrowthData = createSelector(
  selectNationalCircumstances,
  data => {
    if (!data) return null;
    const gdpGrowthData = data.find(d => d.name === 'GDP_growth');
    if (!gdpGrowthData) return null;
    return gdpGrowthData.categoryYears.map(d => ({
      yG: d.value,
      x: d.year,
      greyArea: [ -2, 0 ]
    }));
  }
);

const getChartData = createSelector(filterGDPGrowthData, data => {
  if (!data) return null;
  return {
    config: {
      axes: {
        xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
        yLeft: { name: 'GDP Growth', format: 'number', unit: '' }
      },
      theme: { yG: { stroke: '#0E9560', fill: '#0E9560' }, greyArea: {} },
      tooltip: { yG: { label: 'GDP Growth' }, greyArea: { label: '' } },
      animation: false,
      columns: {
        x: [ { label: 'year', value: 'x' } ],
        y: [ { label: 'GDP Growth', value: 'yG' } ]
      }
    },
    domain: { x: [ 'auto, auto' ], y: [ '0', 'auto' ] },
    dataSelected: [ { value: 1, label: 'GDP Growth' } ],
    dataOptions: [ { value: 1, label: 'GDP Growth' } ],
    data
  };
});

export const getGdpGrowth = createStructuredSelector({
  chartData: getChartData
});
