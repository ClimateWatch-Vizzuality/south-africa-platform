import { createSelector, createStructuredSelector } from 'reselect';

export const YEAR_OPTIONS = {
  YEAR_2015: { label: '2015', value: '2014' },
  YEAR_2016: { label: '2016', value: '2016' },
  YEAR_2017: { label: '2017', value: '2017' }
};

const getQueryParams = ({ location = {} }) => location.query || null;

// TODO: { geometryId: [array of priorities] } once the API is ready
const selectPopulations = () => ({
  'KwaZulu-Natal': [
    { title: '54,001,593', description: 'Total South Africa Population' },
    { title: '1.58%', description: 'South Africa population growth rate' }
  ]
});

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getPopulationList = createSelector(
  selectPopulations,
  populations => populations
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

export const getPopulation = createStructuredSelector({
  query: getQueryParams,
  populationList: getPopulationList,
  activeTabValue: getActiveTabValue,
  yearsOptions: getYearOptions,
  yearSelected: getYearSelected
});
