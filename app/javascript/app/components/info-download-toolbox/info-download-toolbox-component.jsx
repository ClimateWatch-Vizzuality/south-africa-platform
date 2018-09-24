import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ButtonGroup, Button, Icon } from 'cw-components';
import iconInfo from 'assets/icons/info';
import downloadIcon from 'assets/icons/download';
import buttonThemes from 'styles/themes/button';
import ReactTooltip from 'react-tooltip';
import ModalMetadata from 'components/modal-metadata';
import styles from './info-download-toolbox-styles.scss';

class InfoDownloadToolbox extends PureComponent {
  handleDownloadClick = () => {
    console.info('TODO: Download ');
  };

  handleInfoClick = () => {
    const { slugs, setModalMetadata } = this.props;
    if (slugs) {
      setModalMetadata({ slugs, open: true });
    }
  };

  render() {
    const { theme } = this.props;
    return (
      <ButtonGroup
        theme={{ wrapper: cx(styles.buttonWrapper, theme.buttonWrapper) }}
      >
        <div data-for="blueTooltip" data-tip="Chart information">
          <Button
            onClick={this.handleInfoClick}
            theme={{
              button: cx(buttonThemes.outline, styles.button, theme.infobutton)
            }}
          >
            <Icon icon={iconInfo} />
          </Button>
        </div>
        <div data-for="blueTooltip" data-tip="Download chart in .csv">
          <Button
            onClick={this.handleDownloadClick}
            theme={{
              button: cx(buttonThemes.outline, styles.button, theme.infobutton)
            }}
            disabled
          >
            <Icon icon={downloadIcon} />
          </Button>
        </div>
        <ReactTooltip
          id="blueTooltip"
          effect="solid"
          className="global_blueTooltip"
        />
        <ModalMetadata />
      </ButtonGroup>
    );
  }
}

InfoDownloadToolbox.propTypes = {
  theme: PropTypes.shape({
    buttonWrapper: PropTypes.string,
    infobutton: PropTypes.string
  }),
  slugs: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  setModalMetadata: PropTypes.func.isRequired
};

InfoDownloadToolbox.defaultProps = { theme: {}, slugs: null };

export default InfoDownloadToolbox;
