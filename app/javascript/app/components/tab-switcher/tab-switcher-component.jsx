import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Input } from 'cw-components';
import cx from 'classnames';
import ModalMetadata from 'components/modal-metadata';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './tab-switcher-styles';

class TabSwitcher extends PureComponent {
  render() {
    const {
      tabs,
      searchActive,
      searchFilter,
      actionsActive,
      activeTabValue,
      onTabChange,
      onFilterChange,
      downloadUri
    } = this.props;
    const activeTab = activeTabValue
      ? tabs.find(t => t.value === activeTabValue)
      : tabs[0];
    const onlyOneTab = tabs.length < 2;
    return (
      <div className={styles.wrapper}>
        <div className={cx(styles.toolbar, { [styles.flexEnd]: onlyOneTab })}>
          <Switch
            options={tabs.map(o => ({
              name: o.name,
              value: o.value,
              disabled: o.disabled
            }))}
            selectedOption={activeTab.value}
            onClick={onTabChange}
            theme={{
              wrapper: styles.switch,
              option: styles.switchOption,
              checkedOption: styles.switchSelected
            }}
          />
          <div className={styles.toolbarActions}>
            {
              actionsActive &&
                (
                  <InfoDownloadToolbox
                    slugs="historical_emissions_cait"
                    downloadUri={downloadUri}
                    className={styles.buttonWrapper}
                  />
                )
            }
            {
              searchActive &&
                (
                  <Input
                    value={searchFilter}
                    placeholder="Search"
                    theme={{ wrapper: styles.inputWrapper }}
                    onChange={onFilterChange}
                  />
                )
            }
          </div>
        </div>
        {
          activeTab && activeTab.component && (
          <div className={styles.tabContent}>
            <activeTab.component.type {...activeTab.component.props}>
              {activeTab.component.props.children}
            </activeTab.component.type>
          </div>
            )
        }
        <ModalMetadata />
      </div>
    );
  }
}

TabSwitcher.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      component: PropTypes.node
    })
  ),
  activeTabValue: PropTypes.string,
  searchFilter: PropTypes.string,
  searchActive: PropTypes.bool,
  actionsActive: PropTypes.bool,
  onFilterChange: PropTypes.func,
  onTabChange: PropTypes.func.isRequired,
  downloadUri: PropTypes.string
};

TabSwitcher.defaultProps = {
  tabs: [],
  activeTabValue: null,
  searchFilter: '',
  searchActive: true,
  actionsActive: true,
  onFilterChange: () => {
  },
  downloadUri: null
};

export default TabSwitcher;
