import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';

const getQueryParams = ({ location = {} }) => location.query || null;
const getSection = ({ location = {} }) => location.payload.section || null;

const getData = ({ financialResourcesReceived = {} }) =>
  isEmpty(financialResourcesReceived.data.data)
    ? null
    : financialResourcesReceived.data.data;

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query && query.tab || 'international'
);

const filterDataByFinanceFlow = createSelector([ getData, getActiveTabValue ], (
  data,
  tab
) =>
  {
    if (!data) return null;
    const financeFlows = {
      international: [
        'Additional support received',
        'Multilater funds received'
      ],
      domestic: [ 'Domestic finance' ],
      nonMonetized: [ 'Non-monetary support received' ]
    };
    return data.filter(d => financeFlows[tab].includes(d.financeFlow));
  });

const getMockedData = () => ({
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

const getFinancialFlowOptions = createSelector(
  filterDataByFinanceFlow,
  data => {
    if (!data) return null;
    const financeFlowKeys = uniq(compact(data.map(d => d.typeFunds)));
    const financeFlowKeysWithAll = financeFlowKeys.slice();
    // just to avoid mutation
    financeFlowKeysWithAll.unshift('All selected');
    return parseOptions(financeFlowKeysWithAll);
  }
);

const getCountryOptions = createSelector(filterDataByFinanceFlow, data => {
  if (!data) return null;
  const countries = uniq(data.map(d => d.donor.name));
  return countries.length > 0 && parseOptions(countries) || null;
});

const getChartTypeOptions = createSelector(
  getMockedData,
  data => data && data.chartType && parseOptions(data.chartType) || null
);

const getDonorValues = createSelector([ getQueryParams, getDonorOptions ], (
  query,
  options
) =>
  {
    if (!query || !query.donor) return options && options[0];
    return options && options.find(o => o.value === query.donor) || null;
  });

const getFinancialFlowValues = createSelector(
  [ getQueryParams, getFinancialFlowOptions ],
  (query, options) => {
    if (!options) return null;
    if (!query || !query.financialFlow) return options && options[0];
    return options && options.find(o => o.value === query.financialFlow) ||
      null;
  }
);

const getCountryValues = createSelector([ getQueryParams, getCountryOptions ], (
  query,
  options
) =>
  {
    if (!query || !query.country) return options && options[0];
    return options && options.find(o => o.value === query.country) || null;
  });

const getChartTypeValues = createSelector(
  [ getQueryParams, getChartTypeOptions ],
  (query, options) => {
    if (!query || !query.chartType) return options && options[0];
    return options && options.find(o => o.value === query.chartType) || null;
  }
);

const getValues = createStructuredSelector({
  financialFlow: getFinancialFlowValues,
  country: getCountryValues,
  chartType: getChartTypeValues,
  donor: getDonorValues
});

const getOptions = createStructuredSelector({
  financialFlow: getFinancialFlowOptions,
  country: getCountryOptions,
  chartType: getChartTypeOptions,
  donor: getDonorOptions
});

const getDropdownConfig = createSelector(getActiveTabValue, tab => {
  const dropdowns = {
    chartType: { label: 'Chart type', slug: 'chartType' },
    financialFlow: { label: 'Financial flows', slug: 'financialFlow' },
    country: { label: 'Country', slug: 'country' },
    donor: { label: 'Donor', slug: 'donor' }
  };
  const { chartType, financialFlow, country, donor } = dropdowns;
  const sectionDropdowns = {
    international: [ financialFlow, country, chartType ],
    domestic: [ financialFlow, donor, chartType ],
    nonMonetized: [ donor, chartType ]
  };
  return !tab ? sectionDropdowns.international : sectionDropdowns[tab];
});

const filterData = createSelector([ filterDataByFinanceFlow, getValues ], (
  data,
  values
) =>
  {
    if (!data) return null;
    let updatedData = data;
    updatedData = updatedData.filter(
      d => d.donor.name === values.country.value
    );
    if (values.financialFlow.value !== 'All selected') {
      updatedData = updatedData.filter(
        d => d.typeFunds === values.financialFlow.value
      );
    }
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
