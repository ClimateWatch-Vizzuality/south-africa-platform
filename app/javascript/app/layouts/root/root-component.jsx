import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { Loading } from 'cw-components';
import universal from 'react-universal-component';

import Nav from 'components/nav';
import Footer from 'components/footer';

import styles from './root-styles.scss';

const universalOptions = {
  loading: <Loading height={500} />,
  minDelay: 400
}
const PageComponent = universal((
  { path } /* webpackChunkName: "[request]" */
) => (import(`../../${path}.js`)), universalOptions);

class App extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div className={styles.app}>
        <Nav />
        <PageComponent path={route.component} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  route: Proptypes.object.isRequired
};

export default App;
