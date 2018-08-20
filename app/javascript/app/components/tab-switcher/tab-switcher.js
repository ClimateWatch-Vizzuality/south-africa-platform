import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabSwitcher from './tab-switcher-component';

class TabSwitcherContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTabValue: props.activeTabValue || props.tabs[0].value
    };
  }

  handleTabChange = ({ value }) => {
    this.setState({ activeTabValue: value });
  };

  handleInfoClick = () => {
    console.info('TODO: show the metadata of', this.state.activeTabValue);
  };

  handleDownloadClick = () => {
    console.info('TODO: open download link of', this.state.activeTabValue);
  };

  handleDownloadClick = filter => {
    console.info('TODO: filtler table with', filter);
  };

  render() {
    return (
      <TabSwitcher
        {...this.props}
        activeTabValue={this.state.activeTabValue}
        onTabChange={this.handleTabChange}
        onInfoClick={this.handleInfoClick}
        onDownloadClick={this.handleDownloadClick}
        onFilterChange={this.handleDownloadClick}
      />
    );
  }
}

TabSwitcherContainer.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      component: PropTypes.node
    })
  ),
  activeTabValue: PropTypes.string
};

TabSwitcherContainer.defaultProps = { tabs: [], activeTabValue: null };

export default TabSwitcherContainer;
