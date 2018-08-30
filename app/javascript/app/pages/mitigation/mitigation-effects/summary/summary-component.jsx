import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, ButtonGroup, Button, Icon } from 'cw-components';

import iconInfo from 'assets/icons/info';
import iconDownload from 'assets/icons/download';

import styles from './summary-styles';

class Summary extends PureComponent {
  handleThemeChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ theme: value });
  };

  handleVisTypeChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ visType: value });
  };

  render() {
    const {
      themeOptions,
      themeSelected,
      visTypeSelected,
      visTypeOptions
    } = this.props;
    return (
      <div className={styles.columns}>
        <Dropdown
          label="Theme"
          value={themeSelected}
          options={themeOptions}
          onValueChange={this.handleThemeChange}
          hideResetButton
        />
        <Dropdown
          label="GHG Emissions Reduction?? "
          value={{ label: '???', value: '???' }}
          options={{ label: '???', value: '???' }}
          onValueChange={this.handleThemeChange}
          hideResetButton
        />
        <Dropdown
          label="Visualization"
          value={visTypeSelected}
          options={visTypeOptions}
          onValueChange={this.handleVisTypeChange}
          hideResetButton
        />
        <ButtonGroup theme={{ wrapper: styles.buttonGroupWrapper }}>
          <Button onClick={() => console.info('Clicked on info')}>
            <Icon icon={iconInfo} />
          </Button>
          <Button onClick={() => console.info('Clicked on download')} disabled>
            <Icon icon={iconDownload} />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

Summary.propTypes = {
  themeOptions: PropTypes.array,
  themeSelected: PropTypes.object,
  visTypeOptions: PropTypes.array,
  visTypeSelected: PropTypes.object,
  // setModalMetadata: PropTypes.func.isRequired
  onFilterChange: PropTypes.func.isRequired
};

Summary.defaultProps = {
  themeOptions: [],
  themeSelected: null,
  visTypeOptions: [],
  visTypeSelected: null
};

export default Summary;
