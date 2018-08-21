import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setModalMetadata
} from 'components/modal-metadata/modal-metadata-actions';

import TabSwitcher from './tab-switcher-component';

class TabSwitcherContainer extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      // TODO: use the active slug
      open: true
    });
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
        onInfoClick={this.handleInfoClick}
        onDownloadClick={this.handleDownloadClick}
        onFilterChange={this.handleDownloadClick}
      />
    );
  }
}

TabSwitcherContainer.propTypes = {
  setModalMetadata: PropTypes.func.isRequired
};

TabSwitcherContainer.defaultProps = {};

export default connect(null, { setModalMetadata })(TabSwitcherContainer);
