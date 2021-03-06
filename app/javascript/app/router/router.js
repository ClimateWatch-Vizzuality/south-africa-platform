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
    parentSection: 'national_circumstances',
    link: '/national-circumstances',
    path: '/national-circumstances/:section?',
    component: 'layouts/sections/sections',
    sections: NationalSections
  },
  [GHG_EMISSIONS]: {
    nav: true,
    label: 'Ghg Emissions',
    parentSection: 'ghg_emissions',
    link: '/ghg-emissions',
    path: '/ghg-emissions/:section?',
    component: 'layouts/sections/sections',
    sections: GHGSections
  },
  [MITIGATIONS]: {
    nav: true,
    label: 'Mitigation Actions',
    parentSection: 'mitigation_actions_section',
    link: '/mitigation',
    path: '/mitigation/:section?',
    component: 'layouts/sections/sections',
    sections: MitigationSections
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
    parentSection: 'financial_resources',
    link: '/financial-resources',
    path: '/financial-resources/:section?',
    component: 'layouts/sections/sections',
    sections: FinancialSections
  },
  [NOT_FOUND]: {
    path: '/404',
    thunk: dispatch => dispatch(redirect({ type: HOME }))
  }
};
export default connectRoutes(history, routes, { querySerializer: queryString });
