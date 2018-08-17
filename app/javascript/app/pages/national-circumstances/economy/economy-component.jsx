import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import { Switch } from 'cw-components';
// import EconomyDataProvider from 'providers/climate-risks-data-provider';
import styles from './economy-styles.scss';

const GDP_KEY = 'gdp';
const GDP_GROWTH_KEY = 'gdp-growth';
const HUMAN_DEVELOPMENT_INDEX_KEY = 'human-development-index';

const switchOptions = [
  { name: 'GDP', value: GDP_KEY },
  { name: 'GDP GROWTH', value: GDP_GROWTH_KEY },
  { name: 'Human Development Index', value: HUMAN_DEVELOPMENT_INDEX_KEY }
];

class Economy extends PureComponent {
  constructor() {
    super();
    this.state = { openedTab: GDP_KEY };
    this.handleClickOnSwitchOption = this.handleClickOnSwitchOption.bind(this);
  }

  handleClickOnSwitchOption = selectedOption => {
    this.setState({ openedTab: selectedOption.value });
  };

  render() {
    const { openedTab } = this.state;

    const isGDPGrowthSectionActive = openedTab === GDP_GROWTH_KEY;
    const isGDPSectionActive = openedTab === GDP_KEY;
    const isHumanDevIndexSectionActive = openedTab ===
      HUMAN_DEVELOPMENT_INDEX_KEY;

    return (
      <div className={styles.sectionWrapper}>
        <SectionTitle title="Economy" selectedOption={this.openedTab} />
        <div className="switch-wrapper">
          <Switch
            options={switchOptions}
            selectedOption={openedTab}
            onClick={selectedOption =>
              this.handleClickOnSwitchOption(selectedOption)}
          />
        </div>
        {isGDPSectionActive && <SectionTitle title="GDP SECTION ACTIVE" />}
        {isGDPGrowthSectionActive && <SectionTitle title="GDP GROWTH ACTIVE" />}
        {
          isHumanDevIndexSectionActive &&
            <SectionTitle title="HUMAN DEVELOPMENT INDEX ACTIVE" />
        }
      </div>
    );
  }
}

export default Economy;
