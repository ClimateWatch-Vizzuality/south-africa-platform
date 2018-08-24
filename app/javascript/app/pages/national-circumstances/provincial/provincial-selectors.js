import { createSelector, createStructuredSelector } from 'reselect';

const getQueryParams = ({ location = {} }) => location.query || null;

// TODO: { geometryId: [array of priorities] } once the API is ready
const selectMitigations = () => [
  'Energy efficiency',
  'Development of renewable and alternate sustainable energy resources',
  'Effective waste management strategies',
  'Cleaner fuel programmes for households and transport',
  'Transition towards a low carbon agriculture sector',
  'Soil carbon sequestration',
  'Energy Efficiency at farm level (reduced fossil fuel consumption and use of grid electricity)',
  'Stimulate and incentivise local technology innovation for climate resilience '
];

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getMitigationList = createSelector(
  selectMitigations,
  mitigations => mitigations
);

export const getProvincial = createStructuredSelector({
  query: getQueryParams,
  mitigationList: getMitigationList,
  activeTabValue: getActiveTabValue
});
