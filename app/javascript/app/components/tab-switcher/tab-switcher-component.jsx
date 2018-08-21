import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, ButtonGroup, Button, Icon, Input } from 'cw-components';
import ModalMetadata from 'components/modal-metadata';

import iconInfo from 'assets/icons/info';
import downloadIcon from 'assets/icons/download';

import styles from './tab-switcher-styles';

class TabSwitcher extends PureComponent {
  render() {
    const {
      tabs,
      activeTabValue,
      onTabChange,
      onInfoClick,
      onDownloadClick,
      onFilterChange
    } = this.props;
    const activeTab = activeTabValue
      ? tabs.find(t => t.value === activeTabValue)
      : tabs[0];

    return (
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <Switch
            options={tabs.map(o => ({ name: o.name, value: o.value }))}
            selectedOption={activeTab.value}
            onClick={onTabChange}
            theme={{
              wrapper: styles.switch,
              option: styles.switchOption,
              checkedOption: styles.switchSelected
            }}
          />
          <div className={styles.toolbarActions}>
            <ButtonGroup theme={{ wrapper: styles.buttonWrapper }}>
              <Button
                onClick={onInfoClick}
                theme={{ button: styles.infobutton }}
              >
                <Icon icon={iconInfo} />
              </Button>
              <Button
                onClick={onDownloadClick}
                theme={{ button: styles.infobutton }}
              >
                <Icon icon={downloadIcon} />
              </Button>
            </ButtonGroup>
            <Input
              placeholder="Search"
              theme={{ wrapper: styles.inputWrapper }}
              onChange={onFilterChange}
            />
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
  onInfoClick: PropTypes.func,
  onDownloadClick: PropTypes.func,
  onFilterChange: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired
};

TabSwitcher.defaultProps = {
  tabs: [],
  activeTabValue: null,
  onInfoClick: () => {
  },
  onDownloadClick: () => {
  }
};

export default TabSwitcher;
