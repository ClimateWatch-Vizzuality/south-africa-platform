import camelCase from 'lodash/camelCase';
import sortBy from 'lodash/sortBy';
import * as actions from './metadata-provider-actions';

export const initialState = {
  ghg: { loading: false, loaded: false, error: false, data: null }
};

function parseDataByMeta(data, meta) {
  switch (meta) {
    case 'ghg': {
      const dataParsed = {};
      const leData = data.metadata;
      Object.keys(leData).forEach(
        key => {
          const camelCasedkey = camelCase(key);
          dataParsed[camelCasedkey] = sortBy(
            leData[key].map(item => {
              let newItem = {
                value: item.id,
                label: key === 'location'
                  ? item.wriStandardName.trim()
                  : item.name.trim(),
                ...(item.parentId && { parentId: item.parentId })
              };
              if (key === 'location') {
                newItem = { ...newItem, iso: item.isoCode3 };
              }
              if (key === 'dataSource') {
                newItem = {
                  ...newItem,
                  location: item.locationIds,
                  sector: item.sectorIds,
                  gas: item.gasIds,
                  gwp: item.gwpIds,
                  source: item.source.replace('historical_emissions_', '')
                };
              }
              return newItem;
            }),
            'label'
          );
        },
        this
      );

      return dataParsed;
    }

    default:
      return data;
  }
}

export default {
  [actions.fetchMetaInit]: (state, { payload }) => ({
    ...state,
    [payload.meta]: { ...state[payload.meta], loading: true }
  }),
  [actions.fetchMetaReady]: (state, { payload }) => ({
    ...state,
    [payload.meta]: {
      ...state[payload.meta],
      loading: false,
      data: parseDataByMeta(payload.data, payload.meta)
    }
  }),
  [actions.fetchMetaFail]: (state, { payload }) => ({
    ...state,
    [payload.meta]: {
      ...state[payload.meta],
      loading: false,
      error: payload.error
    }
  })
};
