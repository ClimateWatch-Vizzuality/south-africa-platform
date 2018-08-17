import { combineReducers } from 'redux';
import { handleModule } from 'redux-tools';

// Router
import router from 'router';

// Providers
import { reduxModule as ghgMeta } from 'providers/ghg-meta-provider';
import { reduxModule as ghgEmissions } from 'providers/ghg-emissions-provider';
import { reduxModule as worldBank } from 'providers/world-bank-provider';
import {
  reduxModule as countriesOverview
} from 'providers/overview-country-info-provider';
import {
  reduxModule as climateRisksData
} from 'providers/climate-risks-data-provider';

// Components
import { reduxModule as modalMetadata } from 'components/modal-metadata';

const providersReducers = {
  GHGMeta: handleModule(ghgMeta),
  GHGEmissions: handleModule(ghgEmissions),
  WorldBank: handleModule(worldBank),
  modalMetadata: handleModule(modalMetadata),
  countriesOverviewData: handleModule(countriesOverview),
  climateRisksData: handleModule(climateRisksData)
};

export default combineReducers({
  location: router.reducer,
  ...providersReducers
});
