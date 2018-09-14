import { createStructuredSelector } from 'reselect';

const naturalDisastersData = () => [
  {
    title: 'Mitigation: Greenhouse Gas Targets',
    description: `“South Africa’s emissions by 2025 and 2030 will be in a range between 398 and 614 Mt CO2–eq, as defined in national policy.”`
  },
  { title: 'Target type', description: 'Absolute Emissions Reduction' },
  { title: 'Target years', description: '2025 2030' },
  {
    title: 'Free State Province',
    description: 'Intense wild fies: significant damages caused...'
  }
];
export const getNaturalDisastersData = createStructuredSelector({
  naturalDisastersData
});
