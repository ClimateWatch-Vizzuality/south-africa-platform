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
  reduxModule as financialResourcesNeeded
} from 'providers/financial-resources-needed-provider';
import {
  reduxModule as financialResourcesReceived
} from 'providers/financial-resources-received-provider';

import {
  reduxModule as flagshipProgrammes
} from 'providers/flagship-programmes-provider';
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
  reduxModule as nationalCircumstances
} from 'providers/national-circumstances-provider';
import {
  reduxModule as nationalCircumstancesPriorities
} from 'providers/national-circumstances-priorities-provider';

// Components
import { reduxModule as modalMetadata } from 'components/modal-metadata';
import { reduxModule as modalInfo } from 'components/modal-info';

const providersReducers = {
  GHGEmissions: handleModule(ghgEmissions),
  GHGInventory: handleModule(ghgInventory),
  mitigationEffects: handleModule(mitigationEffects),
  mitigationActions: handleModule(mitigationActions),
  flagshipProgrammes: handleModule(flagshipProgrammes),
  financialResourcesNeeded: handleModule(financialResourcesNeeded),
  financialResourcesReceived: handleModule(financialResourcesReceived),
  WorldBank: handleModule(worldBank),
  metadata: handleModule(metadata),
  countriesOverviewData: handleModule(countriesOverview),
  naturalDisastersData: handleModule(naturalDisastersData),
  modalMetadata: handleModule(modalMetadata),
  modalInfo: handleModule(modalInfo),
  projectedEmissions: handleModule(projectedEmissions),
  nationalCircumstances: handleModule(nationalCircumstances),
  nationalCircumstancesPriorities: handleModule(nationalCircumstancesPriorities)
};

export default combineReducers({
  location: router.reducer,
  ...providersReducers
});
