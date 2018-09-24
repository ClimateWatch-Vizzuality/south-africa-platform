import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';

const getQueryParams = ({ location = {} }) => location.query || null;
const getSection = ({ location = {} }) => location.payload.section || null;

const getData = ({ financialResourcesReceived = {} }) =>
  isEmpty(financialResourcesReceived.data.data)
    ? null
    : financialResourcesReceived.data.data;

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getMockedData = () => ({
  fundOrigin: [ 'Bilateral', 'Multilateral' ],
  financialFlow: [ 'Grants', 'Loans', 'All Selected' ],
  country: [ 'All selected' ],
  chartType: [ 'Flows', 'Comparison' ],
  donor: [ 'Adaptation Fund' ]
});

const parseOptions = options => options.map(o => ({ label: o, value: o }));
const getDonorOptions = createSelector(
  getMockedData,
  data => data && data.donor && parseOptions(data.donor) || null
);
const getFundOriginOptions = createSelector(
  getMockedData,
  data => data && data.fundOrigin && parseOptions(data.fundOrigin) || null
);
const getFinancialFlowOptions = createSelector(getData, data => {
  if (!data) return null;
  const financeFlows = uniq(data.map(d => d.financeFlow));
  return financeFlows.length > 0 && parseOptions(financeFlows) || null;
});

const getCountryOptions = createSelector(getData, data => {
  if (!data) return null;
  const countries = uniq(data.map(d => d.donor.name));
  return countries.length > 0 && parseOptions(countries) || null;
});
const getChartTypeOptions = createSelector(
  getMockedData,
  data => data && data.chartType && parseOptions(data.chartType) || null
);

const getFundOriginValues = createSelector(
  [ getQueryParams, getFundOriginOptions ],
  (query, options) => {
    if (!query || !query.fundOrigin) return options && options[0];
    return options.find(o => o.value === query.fundOrigin) || null;
  }
);

const getDonorValues = createSelector([ getQueryParams, getDonorOptions ], (
  query,
  options
) =>
  {
    if (!query || !query.donor) return options && options[0];
    return options.find(o => o.value === query.donor) || null;
  });

const getFinancialFlowValues = createSelector(
  [ getQueryParams, getFinancialFlowOptions ],
  (query, options) => {
    if (!options) return null;
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

const getChartTypeValues = createSelector(
  [ getQueryParams, getChartTypeOptions ],
  (query, options) => {
    if (!query || !query.chartType) return options && options[0];
    return options.find(o => o.value === query.chartType) || null;
  }
);

const getValues = createStructuredSelector({
  fundOrigin: getFundOriginValues,
  financialFlow: getFinancialFlowValues,
  country: getCountryValues,
  chartType: getChartTypeValues,
  donor: getDonorValues
});

const getOptions = createStructuredSelector({
  fundOrigin: getFundOriginOptions,
  financialFlow: getFinancialFlowOptions,
  country: getCountryOptions,
  chartType: getChartTypeOptions,
  donor: getDonorOptions
});

const getDropdownConfig = createSelector(getQueryParams, query => {
  const dropdownConfig = [
    { label: 'Origin of funds', slug: 'fundOrigin' },
    { label: 'Financial flows', slug: 'financialFlow' },
    { label: 'Chart type', slug: 'chartType' }
  ];
  let tabSpecificDropdowns = [ { label: 'Country', slug: 'country' } ];
  if (!query) return dropdownConfig.concat(tabSpecificDropdowns);
  const { tab } = query;
  if (tab === 'domestic') {
    tabSpecificDropdowns = [ { label: 'Donor', slug: 'donor' } ];
  }
  return dropdownConfig.concat(tabSpecificDropdowns);
});

const filterData = createSelector([ getData, getValues ], (data, values) => {
  if (!data) return null;
  let updatedData = data;
  updatedData = updatedData.filter(
    d => d.financeFlow === values.financialFlow.value
  );
  updatedData = updatedData.filter(d => d.donor.name === values.country.value);
  return updatedData;
});

export const getSupportReceived = createStructuredSelector({
  data: filterData,
  section: getSection,
  query: getQueryParams,
  activeTabValue: getActiveTabValue,
  options: getOptions,
  values: getValues,
  dropdownConfig: getDropdownConfig
});
