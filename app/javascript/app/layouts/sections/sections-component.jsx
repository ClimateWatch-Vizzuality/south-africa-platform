import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import universal from 'react-universal-component';
import { Loading } from 'cw-components';

import styles from './sections-styles.scss';

const universalOptions = {
  loading: Loading,
  minDelay: 400
}
const SectionComponent = universal((
  { page, section } /* webpackChunkName: "[request]" */
) => (import(`../../pages${page}/${section}/${section}.js`)), universalOptions);

class Planning extends PureComponent {
  render() {
    const { route, section } = this.props;
    return (
      <div className={styles.page}>
        <h2>{route.label}</h2>
        {route.sections && route.sections.length > 0 &&
          route.sections.map(s => (
            <NavLink className={styles.link} to={s.path} activeClassName={styles.active} exact>
              {s.label}
            </NavLink>
          ))
        }
        <SectionComponent page={route.link} section={section.slug} />
      </div>
    );
  }
}

Planning.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
}

export default Planning;
