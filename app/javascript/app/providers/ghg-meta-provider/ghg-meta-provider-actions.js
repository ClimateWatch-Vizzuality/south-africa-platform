import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

import camelCase from 'lodash/camelCase';
import isEmpty from 'lodash/isEmpty';

export const fetchGHGMetaInit = createAction('fetchGHGMetaInit');
export const fetchGHGMetaReady = createAction('fetchGHGMetaReady');
export const fetchGHGMetaFail = createAction('fetchGHGMetaFail');

export const fetchGHGMeta = createThunkAction('fetchGHGMeta', () =>
  (dispatch, state) => {
    const { GHGMeta } = state();
    if (isEmpty(GHGMeta.data) && !GHGMeta.loading) {
      dispatch(fetchGHGMetaInit());
      CWAPI
        .get('emissions/meta')
        .then(data => {
          if (data) {
            const dataParsed = {};
            Object.keys(data).forEach(
              key => {
                const camelCasedkey = camelCase(key);
                dataParsed[camelCasedkey] = data[key].map(item => {
                  let newItem = {
                    value: item.id,
                    label: key === 'location'
                      ? item.wri_standard_name.trim()
                      : item.name.trim()
                  };
                  if (key === 'location') {
                    newItem = { ...newItem, iso: item.iso_code3 };
                  }
                  if (key === 'data_source') {
                    newItem = {
                      ...newItem,
                      location: item.location_ids,
                      sector: item.sector_ids,
                      gas: item.gas_ids,
                      gwp: item.gwp_ids,
                      source: item.source
                    };
                  }
                  return newItem;
                });
              },
              this
            );
            dispatch(fetchGHGMetaReady(dataParsed));
          } else {
            dispatch(fetchGHGMetaReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchGHGMetaFail(error && error.message));
        });
    }
  });
