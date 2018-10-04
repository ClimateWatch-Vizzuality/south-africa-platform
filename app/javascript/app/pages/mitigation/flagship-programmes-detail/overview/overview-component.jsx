import React, { PureComponent } from 'react';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import { PropTypes } from 'prop-types';
import SectionTitle from 'components/section-title';
import cx from 'classnames';
import FlagshipButtons from 'components/flagship-buttons';
import styles from './overview-styles';

class FlagshipProgrammesDetail extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, pageSection: section } = this.props;
    updateQueryParam({ id: value, section });
  };

  render() {
    const { flagshipDetailData } = this.props;
    return (
      <div className={styles.flagshipDetail}>
        <SectionTitle isSubtitle title="Description" className={styles.title} />
        <div className={cx(styles.text, styles.twoColumns)}>
          {flagshipDetailData && flagshipDetailData.description}
        </div>
        <SectionTitle
          isSubtitle
          title="Work Packages"
          className={styles.title}
        />
        {
          flagshipDetailData &&
            flagshipDetailData.workPackage &&
            flagshipDetailData.workPackage.map(workPackage => (
              <div className={styles.blueCard} key={workPackage}>
                {workPackage}
              </div>
            ))
        }
        <SectionTitle isSubtitle title="Outcomes" className={styles.title} />
        <div className={styles.text}>
          {flagshipDetailData && flagshipDetailData.outcomes}
        </div>
        <SectionTitle
          isSubtitle
          title="Other Flagship Programmes"
          className={styles.title}
        />
        <FlagshipButtons
          handleFilterChange={this.handleFilterChange}
          className={styles.flagshipButtons}
        />
        <FlagshipProgrammesProvider />
      </div>
    );
  }
}

FlagshipProgrammesDetail.propTypes = {
  flagshipDetailData: PropTypes.object,
  pageSection: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

FlagshipProgrammesDetail.defaultProps = {
  flagshipDetailData: null,
  pageSection: null
};

export default FlagshipProgrammesDetail;
