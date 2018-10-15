import { createSelector, createStructuredSelector } from 'reselect';
import has from 'lodash/has';

export const YEAR_OPTIONS = {
  YEAR_2003: { label: '2003', value: '2003' },
  YEAR_2004: { label: '2004', value: '2004' },
  YEAR_2012: { label: '2012', value: '2012' }
};

const getQueryParams = ({ location = {} }) => location.query || null;

// TODO: { geometryId: [array of priorities] } once the API is ready
const selectNationalCircumstances = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

export const getYearOptions = createSelector(
  [],
  () => Object.keys(YEAR_OPTIONS).map(key => YEAR_OPTIONS[key])
);

const getYearParam = ({ location }) =>
  location.query ? location.query.year : null;

export const getYearSelected = createSelector(
  [ getYearOptions, getYearParam ],
  (years, year) => {
    if (!year) return years[0];
    return years.find(y => y.value === year);
  }
);

const getRegionPopulation = createSelector(
  [ selectNationalCircumstances, getYearSelected ],
  (data, year) => {
    if (!data || !year) return null;
    const populationRegionData = {};
    data.forEach(d => {
      if (d.name === 'pop_share') {
        const yearValue = d.categoryYears.find(
          c => String(c.year) === year.value
        );
        if (yearValue) {
          populationRegionData[d.location.name] = [
            {
              description: 'South Africa population growth rate',
              value: `${yearValue.value}%`
            }
          ];
        }
      }
    });
    return populationRegionData;
  }
);

export const getPopulation = createStructuredSelector({
  query: getQueryParams,
  populationList: getRegionPopulation,
  activeTabValue: getActiveTabValue,
  yearsOptions: getYearOptions,
  yearSelected: getYearSelected
});
