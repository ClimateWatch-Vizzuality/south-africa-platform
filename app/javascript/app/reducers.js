import { combineReducers } from 'redux';
import { handleModule } from 'redux-tools';

// Router
import router from 'router';

// Providers
import { reduxModule as ghgEmissions } from 'providers/ghg-emissions-provider';
import { reduxModule as ghgInventory } from 'providers/ghg-inventory-provider';
import {
  reduxModule as mitigationEffects
} from 'providers/mitigation-effects-provider';
import {
  reduxModule as mitigationActions
} from 'providers/mitigation-actions-provider';
import {
  reduxModule as financialResources
} from 'providers/financial-resources-provider';
import { reduxModule as worldBank } from 'providers/world-bank-provider';
import { reduxModule as metadata } from 'providers/metadata-provider';
import {
  reduxModule as countriesOverview
} from 'providers/overview-country-info-provider';
import {
  reduxModule as naturalDisastersData
} from 'providers/natural-disasters-data-provider';
import {
  reduxModule as projectedEmissions
} from 'providers/projected-emissions-provider';
import {
  reduxModule as distributionByAge
} from 'providers/distribution-by-age-provider';
import { reduxModule as GDP } from 'providers/gdp-provider';
import {
  reduxModule as HumanDevelopmentIndex
} from 'providers/human-development-index-provider';
import { reduxModule as gdpGrowth } from 'providers/gdp-growth-provider';

// Components
import { reduxModule as modalMetadata } from 'components/modal-metadata';

const providersReducers = {
  GHGEmissions: handleModule(ghgEmissions),
  GHGInventory: handleModule(ghgInventory),
  mitigationEffects: handleModule(mitigationEffects),
  mitigationActions: handleModule(mitigationActions),
  financialResources: handleModule(financialResources),
  WorldBank: handleModule(worldBank),
  metadata: handleModule(metadata),
  countriesOverviewData: handleModule(countriesOverview),
  naturalDisastersData: handleModule(naturalDisastersData),
  modalMetadata: handleModule(modalMetadata),
  ProjectedEmissions: handleModule(projectedEmissions),
  DistributionByAge: handleModule(distributionByAge),
  GDP: handleModule(GDP),
  HumanDevelopmentIndex: handleModule(HumanDevelopmentIndex),
  GdpGrowth: handleModule(gdpGrowth)
};

export default combineReducers({
  location: router.reducer,
  ...providersReducers
});
