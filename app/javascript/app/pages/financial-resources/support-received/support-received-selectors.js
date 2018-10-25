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

const parseOptions = options => options.map(o => ({ label: o, value: o }));

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

const getDonorOptions = createSelector(filterDataByFinanceFlow, data => {
  if (!data) return null;
  const donorKeys = uniq(data.map(d => d.donor.name));
  // just to avoid mutation
  const donorKeysWithAll = donorKeys.slice();
  donorKeysWithAll.unshift('All selected');
  return donorKeysWithAll.length > 1 && parseOptions(donorKeysWithAll) || null;
});

const getChartTypeOptions = () => parseOptions([ 'Flows', 'Bubble Chart' ]);

const getFinancialFlowValues = createSelector(
  [ getQueryParams, getFinancialFlowOptions ],
  (query, options) => {
    if (!options) return null;
    if (!query || !query.financialFlow) return options && options[0];
    return options && options.find(o => o.value === query.financialFlow) ||
      null;
  }
);

const getDonorValues = createSelector([ getQueryParams, getDonorOptions ], (
  query,
  options
) =>
  {
    if (!query || !query.donor) return options && options[0];
    return options && options.find(o => o.value === query.donor) || null;
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
  donor: getDonorValues,
  chartType: getChartTypeValues
});

const getOptions = createStructuredSelector({
  financialFlow: getFinancialFlowOptions,
  donor: getDonorOptions,
  chartType: getChartTypeOptions
});

const getDropdownConfig = createSelector(getActiveTabValue, tab => {
  const dropdowns = {
    chartType: { label: 'Chart type', slug: 'chartType' },
    financialFlow: { label: 'Financial flows', slug: 'financialFlow' },
    donor: { label: 'Donor', slug: 'donor' }
  };
  const { chartType, financialFlow, donor } = dropdowns;
  const sectionDropdowns = {
    international: [ financialFlow, donor, chartType ],
    domestic: [ financialFlow, donor, chartType ],
    nonMonetized: [ donor ]
  };
  return !tab ? sectionDropdowns.international : sectionDropdowns[tab];
});

const filterData = createSelector([ filterDataByFinanceFlow, getValues ], (
  data,
  values
) =>
  {
    if (!data || isEmpty(data)) return null;
    let updatedData = data;
    if (values.donor.value !== 'All selected') {
      updatedData = updatedData.filter(
        d => d.donor.name === values.donor.value
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
