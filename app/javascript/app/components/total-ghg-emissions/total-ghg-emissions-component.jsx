import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { Section, Button, Icon, Dropdown, Chart } from 'cw-components';
import GHGMetaProvider from 'providers/ghg-meta-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import iconInfo from 'assets/icons/info';

import styles from './total-ghg-emissions-styles';

class TotalGhgEmissions extends PureComponent {
  handleInfoClick = () => {
    console.info('clickeeed info');
  };

  render() {
    const { emissionsParams, chartData } = this.props;
    return (
      <React.Fragment>
        <Section title="Historical Emissions" theme={styles}>
          <div className={styles.toolbar}>
            <Dropdown />
            <Button link={<Link to="/ghg-emissions" />} theme={styles}>
              Explore GHG Emissions
            </Button>
            <Button onClick={this.handleInfoClick}>
              <Icon icon={iconInfo} />
            </Button>
          </div>
          <div className={styles.chart}>
            <Chart type="line" hideRemoveOptions {...chartData} />
          </div>
        </Section>
        <GHGMetaProvider />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
      </React.Fragment>
    );
  }
}

TotalGhgEmissions.propTypes = {
  chartData: PropTypes.object,
  emissionsParams: PropTypes.object
};

TotalGhgEmissions.defaultProps = { chartData: {}, emissionsParams: null };

export default TotalGhgEmissions;
