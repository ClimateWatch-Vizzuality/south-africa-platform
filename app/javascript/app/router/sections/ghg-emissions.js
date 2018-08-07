import GHGEmissionsHistorical from 'pages/ghg-emissions/historical';
import GHGEmissionsInventory from 'pages/ghg-emissions/inventory';

export default [
  {
    slug: 'historial',
    label: 'Historical emissions',
    path: '/ghg-emisisons',
    component: GHGEmissionsHistorical,
    default: true
  },
  {
    slug: 'inventory',
    label: 'GHG Inventory Improvement Programme',
    path: '/ghg-emisisons/inventory',
    component: GHGEmissionsInventory
  }
]
