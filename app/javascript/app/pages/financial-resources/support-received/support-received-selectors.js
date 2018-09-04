import { createSelector, createStructuredSelector } from 'reselect';

const getQueryParams = ({ location = {} }) => location.query || null;
const getSection = ({ location = {} }) => location.payload.section || null;

const getSearchValue = createSelector(
  getQueryParams,
  query => query ? query.search : ''
);

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getMockedData = () => ({
  fundOrigin: [ 'Bilateral', 'Multilateral' ],
  financialFlow: [ 'Grants', 'Loans', 'All Selected' ],
  country: [ 'All selected' ],
  chartType: [ 'Flows', 'Comparison' ]
});

const parseOptions = options => options.map(o => ({ label: o, value: o }));
const getFundOriginOptions = createSelector(
  getMockedData,
  data => data && data.fundOrigin && parseOptions(data.fundOrigin) || null
);
const getFinancialFlowOptions = createSelector(
  getMockedData,
  data => data && data.financialFlow && parseOptions(data.financialFlow) || null
);
const getCountryOptions = createSelector(
  getMockedData,
  data => data && data.country && parseOptions(data.country) || null
);
const getChartTypeOptions = createSelector(
  getMockedData,
  data => data && data.chartType && parseOptions(data.chartType) || null
);

const getfundOriginValues = createSelector(
  [ getQueryParams, getFundOriginOptions ],
  (query, options) => {
    if (!query || !query.fundOrigin) return options && options[0];
    return options.find(o => o.value === query.fundOrigin) || null;
  }
);
const getfinancialFlowValues = createSelector(
  [ getQueryParams, getFinancialFlowOptions ],
  (query, options) => {
    if (!query || !query.financialFlow) return options && options[0];
    return options.find(o => o.value === query.financialFlow) || null;
  }
);
const getCountryValues = createSelector([ getQueryParams, getCountryOptions ], (
  query,
  options
) =>
  {
    if (!query || !query.country) return options && options[0];
    return options.find(o => o.value === query.country) || null;
  });
const getchartTypeValues = createSelector(
  [ getQueryParams, getChartTypeOptions ],
  (query, options) => {
    if (!query || !query.chartType) return options && options[0];
    return options.find(o => o.value === query.chartType) || null;
  }
);

const getValues = createStructuredSelector({
  fundOrigin: getfundOriginValues,
  financialFlow: getfinancialFlowValues,
  country: getCountryValues,
  chartType: getchartTypeValues
});

const getOptions = createStructuredSelector({
  fundOrigin: getFundOriginOptions,
  financialFlow: getFinancialFlowOptions,
  country: getCountryOptions,
  chartType: getChartTypeOptions
});

export const getSupportReceived = createStructuredSelector({
  section: getSection,
  query: getQueryParams,
  searchFilter: getSearchValue,
  activeTabValue: getActiveTabValue,
  options: getOptions,
  values: getValues
});
