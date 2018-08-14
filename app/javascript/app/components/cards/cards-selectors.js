// export const getCardsData = () => [
//     {
//       title: 'Mitigation: Greenhouse Gas Targets',
//       description: `“South Africa’s emissions by 2025 and 2030 will be in a range between 398 and 614 Mt CO2–eq, as defined in national policy.”`
//     },

//     { title: 'Target type', description: 'Absolute Emissions Reduction' },
//     { title: 'Target years', description: '2025 2030' }
//   ];
export const getCardsData = countriesOverview => {
  const countriesOverviewData = countriesOverview.data || null;
  if (countriesOverviewData && countriesOverviewData.values) {
    return [
      {
        title: countriesOverviewData.values[1].name,
        description: countriesOverviewData.values[1].value
      },
      {
        title: countriesOverviewData.values[0].name,
        description: countriesOverviewData.values[0].value
      },
      {
        title: countriesOverviewData.values[3].name,
        description: countriesOverviewData.values[3].value
      }
    ];
  }
  return [];
};
