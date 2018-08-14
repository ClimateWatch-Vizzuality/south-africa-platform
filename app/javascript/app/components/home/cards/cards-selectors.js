// export const getCardsData = () => [
//     {
//       title: 'Mitigation: Greenhouse Gas Targets',
//       description: `“South Africa’s emissions by 2025 and 2030 will be in a range between 398 and 614 Mt CO2–eq, as defined in national policy.”`
//     },
//     { title: 'Target type', description: 'Absolute Emissions Reduction' },

//     { title: 'Target years', description: '2025 2030' }

//   ];

import { createSelector, createStructuredSelector } from 'reselect';

const getCountryOverviewData = ({ countriesOverviewData }) =>
  countriesOverviewData.data ? countriesOverviewData.data.values : null;
export const parseCardsData = createSelector(
  getCountryOverviewData,
  overview => overview && overview
      .map(o => ({ title: o.name, description: o.value }))
      .filter((i, index) => index !== 1)
);
export const getCardsData = createStructuredSelector({
  cardsData: parseCardsData
});
