// export const getCardsData = () => [
//     {
//       title: 'Mitigation: Greenhouse Gas Targets',
//       description: `“South Africa’s emissions by 2025 and 2030 will be in a range between 398 and 614 Mt CO2–eq, as defined in national policy.”`

//     },
//     { title: 'Target type', description: 'Absolute Emissions Reduction' },
//     { title: 'Target years', description: '2025 2030' }

//   ];

import { createSelector } from 'reselect';

const firstCardTitleSelector = state => state.data.values[1].name;

const firstCardDescriptionSelector = state => state.data.values[1].value;
const secondCardTitleSelector = state => state.data.values[0].name;

const secondCardDescriptionSelector = state => state.data.values[0].value;
const thirdCardTitleSelector = state => state.data.values[3].name;

const thirdCardDescriptionSelector = state => state.data.values[3].value;
export const getCardsData = createSelector(
  firstCardTitleSelector,
  firstCardDescriptionSelector,
  secondCardTitleSelector,
  secondCardDescriptionSelector,
  thirdCardTitleSelector,
  thirdCardDescriptionSelector,
  (
    firstCardtitle,
    firstCardDesc,
    secondCardTitle,
    secondCardDesc,
    thirdCardTitle,
    thirdCardDesc
  ) => [
    { title: firstCardtitle, description: firstCardDesc },
    { title: secondCardTitle, description: secondCardDesc },
    { title: thirdCardTitle, description: thirdCardDesc }
  ]
);
