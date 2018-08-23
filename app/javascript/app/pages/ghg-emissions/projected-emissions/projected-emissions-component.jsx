import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { LineDottedLineAreaComposedChart } from 'cw-components';

import SectionTitle from 'components/section-title';
import ModalMetadata from 'components/modal-metadata';
import ProjectedEmissionsProvider from 'providers/projected-emissions-provider';

import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './projected-emissions-styles.scss';

class ProjectedEmissions extends PureComponent {
  handleInfoClick = () => {
    const { setModalMetadata } = this.props;
    setModalMetadata({ slugs: 'historical_emissions_cait', open: true });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  render() {
    const { chartData } = this.props;

    return (
      <div className={styles.grid}>
        <div className={styles.toolbarWithSectionTitle}>
          <SectionTitle
            title="Projected Emissions"
            theme={{ sectionTitle: styles.title }}
          />
          <InfoDownloadToolbox
            handleDownloadClick={this.handleDownloadClick}
            handleInfoClick={this.handleInfoClick}
          />
        </div>
        <LineDottedLineAreaComposedChart height={500} {...chartData} />
        <ProjectedEmissionsProvider />
        <ModalMetadata />
      </div>
    );
  }
}

ProjectedEmissions.propTypes = {
  setModalMetadata: PropTypes.func.isRequired,
  handleLegendChange: PropTypes.func.isRequired,
  chartData: PropTypes.object.isRequired
};

ProjectedEmissions.defaultProps = {};

export default ProjectedEmissions;
