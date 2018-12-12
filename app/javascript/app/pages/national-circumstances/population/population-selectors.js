import { createSelector, createStructuredSelector } from 'reselect';
import has from 'lodash/has';
import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import { format } from 'd3-format';

const withCommas = value => format(',')(value);
const divideByMillion = value => format('.2f')(value / 1000000);

const getQueryParams = ({ location = {} }) => location.query || null;

const selectNationalCircumstances = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getTotalPopulationData = createSelector(
  selectNationalCircumstances,
  data => {
    if (!data) return null;
    return data.find(
      d => d.name === 'pop_total' && d.location.name === 'South Africa'
    ) ||
      null;
  }
);

const getTotalGrowthData = createSelector(selectNationalCircumstances, data => {
  if (!data) return null;
  return data.find(d => d.name === 'pop-growth') || null;
});

export const getYearOptions = createSelector(
  selectNationalCircumstances,
  data => {
    if (!data) return null;
    const totalPopulationData = data.find(
      d => d.name === 'pop_total' && d.location.name === 'South Africa'
    );
    const regionData = data.find(
      d => d.name === 'pop_total' && d.location.name !== 'South Africa'
    );
    const yearData = uniq(
      flatMap(
        [ totalPopulationData ].concat(regionData),
        d => d.categoryYears.map(y => String(y.year))
      )
    );
    return yearData.map(year => ({ label: year, value: year }));
  }
);

const getYearParam = ({ location }) =>
  location.query ? location.query.year : null;

export const getYearSelected = createSelector(
  [ getYearOptions, getYearParam ],
  (years, year) => {
    if (!years) return null;
    if (!year) return years[years.length - 1];
    return years.find(y => y.value === year);
  }
);

const findYearData = (data, year) =>
  data.categoryYears.find(d => String(d.year) === year.value);
const getTotalPopulation = createSelector(
  [ getTotalPopulationData, getYearSelected ],
  (data, year) => {
    if (!data || !year) return null;
    const yearData = findYearData(data, year);
    return {
      description: 'Total South Africa population',
      value: yearData ? divideByMillion(yearData.value) : 'No data'
    };
  }
);

const getGrowthRate = createSelector([ getTotalGrowthData, getYearSelected ], (
  data,
  year
) =>
  {
    if (!data || !year) return null;
    const yearData = findYearData(data, year);
    return {
      description: 'South Africa population growth rate compared to previous year',
      value: yearData ? `${withCommas(yearData.value)}%` : 'No data'
    };
  });

const getRegionPopulation = createSelector(
  [ selectNationalCircumstances, getYearSelected ],
  (data, year) => {
    if (!data || !year) return null;
    const populationRegionData = {};
    data.forEach(d => {
      const yearValue = d.categoryYears.find(
        c => String(c.year) === year.value
      );
      const totalRegionPopulationData = data.find(
        p => p.name === 'pop_total' && p.location.name === d.location.name
      );
      const totalRegionPopulationyearData = totalRegionPopulationData &&
        totalRegionPopulationData.categoryYears.find(
          y => y.year === (yearValue && yearValue.year)
        );
      populationRegionData[d.location.name] = [
        {
          slug: 'regionPercentage',
          value: yearValue && yearValue.value ? `${yearValue.value}%` : null
        },
        {
          slug: 'regionTotal',
          value: totalRegionPopulationyearData
            ? divideByMillion(totalRegionPopulationyearData.value)
            : 'No data'
        }
      ];
    });
    return populationRegionData;
  }
);

const getCardsData = createStructuredSelector({
  totalPopulation: getTotalPopulation,
  growthRate: getGrowthRate
});

export const getPopulation = createStructuredSelector({
  query: getQueryParams,
  populationList: getRegionPopulation,
  totalPopulation: getTotalPopulation,
  activeTabValue: getActiveTabValue,
  yearsOptions: getYearOptions,
  yearSelected: getYearSelected,
  cardsData: getCardsData
});
