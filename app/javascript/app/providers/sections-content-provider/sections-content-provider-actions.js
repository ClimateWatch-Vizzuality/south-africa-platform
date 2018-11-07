import { createAction, createThunkAction } from 'redux-tools';
import { SAAPI } from 'services/api';

import isEmpty from 'lodash/isEmpty';

export const fetchSectionsContentInit = createAction(
  'fetchSectionsContentInit'
);
export const fetchSectionsContentReady = createAction(
  'fetchSectionsContentReady'
);
export const fetchSectionsContentFail = createAction(
  'fetchSectionsContentFail'
);

export const fetchSectionsContent = createThunkAction(
  'fetchSectionsContent',
  () => (dispatch, state) => {
    const { SectionsContent } = state();
    if (
      SectionsContent &&
        isEmpty(SectionsContent.data) &&
        !SectionsContent.loading
    ) {
      dispatch(fetchSectionsContentInit());
      SAAPI
        .get('section_content')
        .then(response => {
          if (response && response.data) {
            const { data } = response;
            const sectionsContentMapped = {};
            data.forEach(section => {
              sectionsContentMapped[section.name] = {
                title: section.title,
                description: section.description
              };
            });
            dispatch(fetchSectionsContentReady({ sectionsContentMapped }));
          } else {
            dispatch(fetchSectionsContentReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchSectionsContentFail(error && error.message));
        });
    }
  }
);
