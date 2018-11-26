import { createSelector, createStructuredSelector } from 'reselect';
import has from 'lodash/has';

const selectNationalCircumstances = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const getLoading = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || nationalCircumstances.loading) return true;
  return false;
};
const getHumanIndexDevelopmentIndexData = createSelector(
  selectNationalCircumstances,
  data => {
    if (!data) return null;
    const HDIData = data.filter(d => d.name === 'HDI');
    const years = HDIData &&
      HDIData[0] &&
      HDIData[0].categoryYears.map(d => d.year);
    const getData = location =>
      HDIData.find(d => d.location.isoCode3 === location);
    const getYearData = (location, year) => {
      const locationData = getData(location);
      return locationData &&
        locationData.categoryYears.find(c => c.year === year);
    };
    const getValue = (location, year) => {
      const yearData = getYearData(location, year);
      return yearData && yearData.value;
    };

    const selectedData = years.map(year => ({
      x: year,
      yZAF: getValue('ZAF', year),
      ySSA: getValue('SSA', year),
      yWorld: getValue('WORLD', year)
    }));
    return selectedData;
  }
);

const getChartData = createSelector(
  [ getHumanIndexDevelopmentIndexData, getLoading ],
  (data, loading) => {
    if (!data) return null;
    const dataOptions = [
      { value: 1, label: 'South Africa' },
      { value: 2, label: 'South Saharan Africa' },
      { value: 3, label: 'World' }
    ];

    const chartData = {
      config: {
        axes: {
          xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
          yLeft: { name: 'HDI', unit: 'HDI', format: 'number' }
        },
        theme: {
          yZAF: { stroke: '#0E9560', fill: '#0E9560' },
          ySSA: { stroke: '#F33A37', fill: '#F33A37' },
          yWorld: { stroke: '#3897D9', fill: '#3897D9' }
        },
        tooltip: {
          yZAF: { label: 'South Africa' },
          ySSA: { label: 'South Saharan Africa' },
          yWorld: { label: 'World' }
        },
        animation: false,
        columns: {
          x: [ { label: 'year', value: 'x' } ],
          y: [
            { label: 'South Africa', value: 'yZAF' },
            { label: 'South Saharan Africa', value: 'ySSA' },
            { label: 'World', value: 'yWorld' }
          ]
        }
      },
      data,
      domain: { x: [ 'auto', 'auto' ], y: [ 0, 'auto' ] },
      loading,
      dataOptions,
      dataSelected: dataOptions
    };

    return chartData;
  }
);

export const getHumanDevelopmentIndexData = createStructuredSelector({
  chartData: getChartData
});
