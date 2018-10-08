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

const getDomesticDonorOptions = createSelector(
  getMockedData,
  data => data && data.donor && parseOptions(data.donor) || null
);

const getFinancialFlowOptions = createSelector(
  filterDataByFinanceFlow,
  data => {
    if (!data) return null;
    const financeFlowKeys = uniq(compact(data.map(d => d.typeFunds)));
    // just to avoid mutation
    const financeFlowKeysWithAll = financeFlowKeys.slice();
    financeFlowKeysWithAll.unshift('All selected');
    return parseOptions(financeFlowKeysWithAll);
  }
);

const getInternationalDonorOptions = createSelector(
  filterDataByFinanceFlow,
  data => {
    if (!data) return null;
    const donorKeys = uniq(data.map(d => d.donor.name));
    // just to avoid mutation
    const donorKeysWithAll = donorKeys.slice();
    donorKeysWithAll.unshift('All selected');
    return donorKeysWithAll.length > 1 && parseOptions(donorKeysWithAll) ||
      null;
  }
);

const getChartTypeOptions = createSelector(
  getMockedData,
  data => data && data.chartType && parseOptions(data.chartType) || null
);

const getDomesticDonorValues = createSelector(
  [ getQueryParams, getDomesticDonorOptions ],
  (query, options) => {
    if (!query || !query.donor) return options && options[0];
    return options && options.find(o => o.value === query.donor) || null;
  }
);

const getFinancialFlowValues = createSelector(
  [ getQueryParams, getFinancialFlowOptions ],
  (query, options) => {
    if (!options) return null;
    if (!query || !query.financialFlow) return options && options[0];
    return options && options.find(o => o.value === query.financialFlow) ||
      null;
  }
);

const getInternationalDonorValues = createSelector(
  [ getQueryParams, getInternationalDonorOptions ],
  (query, options) => {
    if (!query || !query.internationalDonor) return options && options[0];
    return options && options.find(o => o.value === query.internationalDonor) ||
      null;
  }
);

const getChartTypeValues = createSelector(
  [ getQueryParams, getChartTypeOptions ],
  (query, options) => {
    if (!query || !query.chartType) return options && options[0];
    return options && options.find(o => o.value === query.chartType) || null;
  }
);

const getValues = createStructuredSelector({
  financialFlow: getFinancialFlowValues,
  internationalDonor: getInternationalDonorValues,
  chartType: getChartTypeValues,
  donor: getDomesticDonorValues
});

const getOptions = createStructuredSelector({
  financialFlow: getFinancialFlowOptions,
  internationalDonor: getInternationalDonorOptions,
  chartType: getChartTypeOptions,
  donor: getDomesticDonorOptions
});

const getDropdownConfig = createSelector(getActiveTabValue, tab => {
  const dropdowns = {
    chartType: { label: 'Chart type', slug: 'chartType' },
    financialFlow: { label: 'Financial flows', slug: 'financialFlow' },
    internationalDonor: { label: 'Donor', slug: 'internationalDonor' },
    domesticDonor: { label: 'Donor', slug: 'donor' }
  };
  const {
    chartType,
    financialFlow,
    internationalDonor,
    domesticDonor
  } = dropdowns;
  const sectionDropdowns = {
    international: [ financialFlow, internationalDonor, chartType ],
    domestic: [ financialFlow, domesticDonor, chartType ],
    nonMonetized: [ domesticDonor, chartType ]
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

    if (values.internationalDonor.value !== 'All selected') {
      updatedData = updatedData.filter(
        d => d.donor.name === values.internationalDonor.value
      );
    }

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
