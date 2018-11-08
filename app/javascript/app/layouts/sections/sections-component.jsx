import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import Sticky from 'react-stickynode';
import { Loading } from 'cw-components';
import lowerCase from 'lodash/lowerCase';
import capitalize from 'lodash/capitalize';
import Nav from 'components/nav';
import navStyles from 'components/nav/nav-styles';
import SectionsContentProvider from 'providers/sections-content-provider';

import ghgEmissionsBg from 'assets/backgrounds/ghg-emissions';
import nationalBg from 'assets/backgrounds/national-circumstances';
import mitigationBg from 'assets/backgrounds/mitigation';

import styles from './sections-styles.scss';

const universalOptions = {
  loading: <Loading height={500} />,
  minDelay: 400
}
const SectionComponent = universal((
  { page, section } /* webpackChunkName: "[request]" */
) => (import(`../../pages${page}/${section}/${section}.js`)), universalOptions);

const backgrounds = {
  '/national-circumstances': nationalBg,
  '/ghg-emissions': ghgEmissionsBg,
  '/mitigation': mitigationBg,
  '/mitigation/flagship-programmes-detail': mitigationBg
}

class Sections extends PureComponent {
  handleStickyChange =  (status) => {
    // Workaround fo fix bad height calculations
    // https://github.com/yahoo/react-stickynode/issues/102#issuecomment-362502692
    if (Sticky.STATUS_FIXED === status.status && this.stickyRef) {
      this.stickyRef.updateInitialDimension();
      this.stickyRef.update();
    }
  }

  render() {
    const { route, section, payload, contentData } = this.props;
    const title = (contentData[route.parentSection] && contentData[route.parentSection].title) || capitalize(lowerCase(payload.id));
    const description = contentData[route.parentSection] && contentData[route.parentSection].description;
    const subsectionTitle = contentData[section.slug] && contentData[section.slug].title;
    const subsectionDesc = contentData[section.slug] && contentData[section.slug].description;
    return (
      <div className={styles.page}>
        <div className={styles.section} style={{ backgroundImage: `url('${backgrounds[route.link]}')`}}>
          <div className={styles.row}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.sectionDescription}>{description}</p>
          </div>

          <Sticky ref={el => {this.stickyRef = el}} onStateChange={this.handleStickyChange} top="#header" activeClass={styles.stickyWrapper} innerZ={6}>
            <div className={styles.row}>
              <Nav theme={{ nav: styles.nav, link: navStyles.linkSubNav }} routes={route.sections} />
            </div>
          </Sticky>
        </div>
        <SectionComponent page={route.link} section={section.slug} title={subsectionTitle} description={subsectionDesc} />
        <SectionsContentProvider />
      </div>
    );
  }
}

Sections.propTypes = {
  route: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  contentData: PropTypes.object.isRequired
}

export default Sections;
