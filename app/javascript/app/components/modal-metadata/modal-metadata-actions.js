import { createAction, createThunkAction } from 'redux-tools';

const { CW_API_URL } = process.env;

export const setModalMetadataParams = createAction('setModalMetadataParams');

// Requires payload params:
// slugs: array of slugs to fetch
// customTitle: custom title if there is more than one slug
export const setModalMetadata = createThunkAction(
  'setModalMetadata',
  payload => dispatch => {
    dispatch(setModalMetadataParams(payload));
    let slugs = payload.slugs;
    if (slugs) {
      if (typeof slugs === 'string') slugs = [ slugs ];
      dispatch(fetchModalMetaData(slugs));
    }
  }
);

export const fetchModalMetaDataInit = createAction('fetchModalMetaDataInit');
export const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
export const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');

export const fetchModalMetaData = createThunkAction(
  'fetchModalMetaDataData',
  slugs => (dispatch, state) => {
    const { modalMetadata } = state();
    const slugsDataMissing = slugs.filter(slug => !modalMetadata.data[slug]);
    const slugsDataHasError = slugs.filter(
      slug => modalMetadata.data[slug] === 'error'
    );
    const slugsToFetch = slugsDataMissing.concat(slugsDataHasError);
    if (slugsToFetch.length > 0) {
      dispatch(fetchModalMetaDataInit());
      const promises = slugsToFetch.map(
        slug =>
          fetch(
            `${CW_API_URL}/metadata/${slug.toLowerCase()}`
          ).then(response => {
            if (response.ok) return response.json();
            throw Error(response.statusText);
          })
      );

      Promise
        .all(promises)
        .then(data => {
          dispatch(fetchModalMetaDataReady({ slugs: slugsToFetch, data }));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchModalMetaDataReady({ slugs, data: 'error' }));
        });
    }
  }
);
