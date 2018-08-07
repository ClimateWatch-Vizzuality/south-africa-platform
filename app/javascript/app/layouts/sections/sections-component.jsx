import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import styles from './sections-styles.scss';

class Planning extends PureComponent {
  render() {
    const { route, section } = this.props;
    const SectionComponent = section.component ||  null;
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
        <SectionComponent />
      </div>
    );
  }
}

Planning.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
}

export default Planning;
