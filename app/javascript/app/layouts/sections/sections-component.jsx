import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import { Section, Loading } from 'cw-components';
import Nav from 'components/nav';

import styles from './sections-styles.scss';

const universalOptions = {
  loading: <Loading height={500} />,
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
        <Section theme={styles}>
          <h2 className={styles.sectionTitle}>{route.label}</h2>
          <Nav theme={styles} routes={route.sections} />
        </Section>
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
