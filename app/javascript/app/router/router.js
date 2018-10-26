import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';

import NationalSections from './sections/national-circumstances';
import GHGSections from './sections/ghg-emissions';
import MitigationSections from './sections/mitigation';
import FinancialSections from './sections/financial-resources';
import FlagshipSections from './sections/flagship-programmes';

const history = createHistory();

export const HOME = 'location/HOME';
export const NATIONAL_CIRCUMSTANCES = 'location/NATIONAL_CIRCUMSTANCES';
export const GHG_EMISSIONS = 'location/GHG_EMISSIONS';
export const MITIGATIONS = 'location/MITIGATIONS';
export const FINANCIAL_RESOURCES = 'location/FINANCIAL_RESOURCES';
export const FLAGSHIP_DETAIL = 'location/FLAGSHIP_DETAIL';

export const routes = {
  [HOME]: {
    nav: true,
    exact: true,
    label: 'Overview',
    link: '/',
    path: '/',
    component: 'pages/home/home'
  },
  [NATIONAL_CIRCUMSTANCES]: {
    nav: true,
    label: 'National Circumstances',
    link: '/national-circumstances',
    path: '/national-circumstances/:section?',
    component: 'layouts/sections/sections',
    sections: NationalSections,
    description: 'This section provides context for South Africa’s climate change response, including information on provincial development priorities, population, economy, energy, and climate risks from natural disasters.'
  },
  [GHG_EMISSIONS]: {
    nav: true,
    label: 'GHG Emissions',
    link: '/ghg-emissions',
    path: '/ghg-emissions/:section?',
    component: 'layouts/sections/sections',
    sections: GHGSections,
    description: 'This section provides information on South Africa’s GHG inventory, the programmes it’s implementing to improve the quality of future national GHG inventories and possible future emissions pathways under different mitigation scenarios.'
  },
  [MITIGATIONS]: {
    nav: true,
    label: 'Mitigation',
    link: '/mitigation',
    path: '/mitigation/:section?',
    component: 'layouts/sections/sections',
    sections: MitigationSections,
    description: `South Africa’s approach to mitigation is informed by its contribution to the international effort to reduce global GHG emissions and its successful management of development and poverty eradication challenges. South Africa is committed to addressing climate change based on science and equity and to work with others to ensure global average temperature increases are kept well below 2°C and potentially 1.5°C above pre-industrial levels. Global average temperature increase of 2°C translates to up to 4°C for South Africa by the end of the century. South Africa’s mitigation action will be accessed against its commitment to reduce emissions to a range between 398 and 614 CO2-eq by 2030 and 2050, as defined in national policy.`
  },
  [FLAGSHIP_DETAIL]: {
    link: '/mitigation/flagship-programmes-detail',
    path: '/mitigation/flagship-programmes/:id/:section?',
    component: 'layouts/sections/sections',
    sections: FlagshipSections
  },
  [FINANCIAL_RESOURCES]: {
    nav: true,
    label: 'Financial Resources',
    link: '/financial-resources',
    path: '/financial-resources/:section?',
    component: 'layouts/sections/sections',
    sections: FinancialSections,
    description: 'This section shows climate finance provided from multilateral, bilateral, and domestic sources as well as remaining financial and non-financial support needs.'
  },
  [NOT_FOUND]: {
    path: '/404',
    thunk: dispatch => dispatch(redirect({ type: HOME }))
  }
};
export default connectRoutes(history, routes, { querySerializer: queryString });
