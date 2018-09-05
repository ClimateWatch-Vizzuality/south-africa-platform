const supportNeededItem = {
  type: 'General',
  preferred_type: 'Grant',
  sector_and_activity: 'Renewable energy, including off-grid and mini grid',
  reference_to_policies_and_measures: 'Energy Efficiency and Demand Side Management Municipality Programme'
};
export const supportNeededData = [ 1, 2, 3, 4 ].map(i => ({
  ...supportNeededItem,
  id: i
}));

export default { supportNeededData };
