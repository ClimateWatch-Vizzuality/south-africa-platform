import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, ButtonGroup, Button, Icon, Input } from 'cw-components';
import cx from 'classnames';
import ModalMetadata from 'components/modal-metadata';

import iconInfo from 'assets/icons/info';
import downloadIcon from 'assets/icons/download';

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
      onInfoClick,
      onDownloadClick,
      onFilterChange
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
              actionsActive && (
              <ButtonGroup theme={{ wrapper: styles.buttonWrapper }}>
                <Button
                  onClick={onInfoClick}
                  theme={{ button: styles.infobutton }}
                >
                  <Icon icon={iconInfo} />
                </Button>
                <Button
                  disabled
                  onClick={onDownloadClick}
                  theme={{ button: styles.infobutton }}
                >
                  <Icon icon={downloadIcon} />
                </Button>
              </ButtonGroup>
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
  onInfoClick: PropTypes.func,
  onDownloadClick: PropTypes.func,
  onFilterChange: PropTypes.func,
  onTabChange: PropTypes.func.isRequired
};

TabSwitcher.defaultProps = {
  tabs: [],
  activeTabValue: null,
  searchFilter: '',
  searchActive: true,
  actionsActive: true,
  onInfoClick: () => {
  },
  onDownloadClick: () => {
  },
  onFilterChange: () => {
  }
};

export default TabSwitcher;
