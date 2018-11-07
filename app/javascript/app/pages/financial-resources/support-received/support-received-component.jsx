import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { Dropdown } from 'cw-components';
import FinancialResourcesReceivedProvider from 'providers/financial-resources-received-provider/financial-resources-received-provider';
import ModalInfo from 'components/modal-info';
import styles from './support-received-styles.scss';
import FlowsChart from './flows-chart';
import ComparisonChart from './comparison-chart';
import NonMonetizedTable from './non-monetized-table';

const INTERNATIONAL_KEY = 'international';
const DOMESTIC_KEY = 'domestic';
const NON_MONETIZED_KEY = 'nonMonetized';

class SupportReceived extends PureComponent {
  handleTabChange = ({ value }) => {
    const { updateQueryParam, query, section } = this.props;
    updateQueryParam({
      query: {
        ...query,
        tab: value,
        comparisonId: undefined,
        donor: undefined,
        chartType: undefined,
        fundingType: undefined
      },
      section
    });
  };

  renderDropdowns() {
    const { handleFilterChange, options, values, dropdownConfig } = this.props;
    return (
      <div className={styles.dropdownWrapper}>
        {dropdownConfig.map(d => (
          <Dropdown
            key={d.label}
            label={d.label}
            theme={{ wrapper: styles.dropdown }}
            options={options[d.slug] || []}
            value={values[d.slug]}
            onValueChange={option => handleFilterChange(d.slug, option.value)}
            hideResetButton
          />
        ))}
      </div>
    );
  }

  renderChartComponent() {
    const { data, values, handleFilterChange } = this.props;
    return (
      <Fragment>
        {this.renderDropdowns()}
        {
          values && values.chartType.value === 'Bubble Chart'
            ? (
              <ComparisonChart
                selectedValues={values}
                handleFilterChange={handleFilterChange}
                data={data}
              />
)
            : <FlowsChart data={data} />
        }
      </Fragment>
    );
  }

  render() {
    const { activeTabValue, data, title } = this.props;
    const component = this.renderChartComponent();
    const renderTabs = [
      { name: 'INTERNATIONAL', value: INTERNATIONAL_KEY, component },
      { name: 'DOMESTIC', value: DOMESTIC_KEY, component },
      {
        name: 'NON-MONETIZED',
        value: NON_MONETIZED_KEY,
        component: (
          <Fragment>
            {this.renderDropdowns()}
            <NonMonetizedTable data={data} />
          </Fragment>
        )
      }
    ];

    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title={title} infoButton />
        <ModalInfo title={title}>
          The financial support committed and received from international sources, as well as domestic funds committed through government grants and loans, are reported below.
        </ModalInfo>
        <TabSwitcher
          tabs={renderTabs}
          searchActive={false}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={activeTabValue}
          downloadUri="financial_resource/received_supports"
          slugs="BUR2"
        />
        <FinancialResourcesReceivedProvider />
      </div>
    );
  }
}

SupportReceived.propTypes = {
  query: PropTypes.object,
  section: PropTypes.string,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  values: PropTypes.object,
  dropdownConfig: PropTypes.array,
  data: PropTypes.array,
  title: PropTypes.string.isRequired
};

SupportReceived.defaultProps = {
  data: null,
  query: null,
  dropdownConfig: [],
  section: null,
  activeTabValue: null,
  options: {},
  values: {}
};

export default SupportReceived;
