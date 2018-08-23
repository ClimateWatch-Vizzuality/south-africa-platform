import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ButtonGroup, Button, Icon } from 'cw-components';
import iconInfo from 'assets/icons/info';
import downloadIcon from 'assets/icons/download';
import styles from './info-download-toolbox-styles.scss';

class InfoDownloadToolbox extends PureComponent {
  render() {
    const { theme, handleInfoClick, handleDownloadClick } = this.props;
    return (
      <ButtonGroup
        theme={{ wrapper: cx(styles.buttonWrapper, theme.buttonWrapper) }}
      >
        <Button
          onClick={handleInfoClick}
          theme={{ button: cx(styles.infobutton, theme.infobutton) }}
        >
          <Icon icon={iconInfo} />
        </Button>
        <Button
          onClick={handleDownloadClick}
          theme={{ button: cx(styles.infobutton, theme.infobutton) }}
        >
          <Icon icon={downloadIcon} />
        </Button>
      </ButtonGroup>
    );
  }
}

InfoDownloadToolbox.propTypes = {
  theme: PropTypes.shape({
    buttonWrapper: PropTypes.string,
    infobutton: PropTypes.string
  }),
  handleDownloadClick: PropTypes.func,
  handleInfoClick: PropTypes.func
};

InfoDownloadToolbox.defaultProps = {
  theme: {},
  handleDownloadClick: () => {
  },
  handleInfoClick: () => {
  }
};

export default InfoDownloadToolbox;
