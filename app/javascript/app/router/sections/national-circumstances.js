import NationalCircumstancesProvincial from 'pages/national-circumstances/provincial';
import NationalCircumstancesPopulation from 'pages/national-circumstances/population';

export default [
  {
    slug: 'provincial',
    label: 'Provincial',
    path: '/national-circumstances',
    component: NationalCircumstancesProvincial,
    default: true
  },
  {
    slug: 'population',
    label: 'Population',
    path: '/national-circumstances/population',
    component: NationalCircumstancesPopulation
  }
]
