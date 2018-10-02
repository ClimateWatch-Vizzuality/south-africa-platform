import React, { PureComponent } from 'react';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import { PropTypes } from 'prop-types';
import SectionTitle from 'components/section-title';
import cx from 'classnames';
import styles from './flagship-programmes-detail-overview-styles';

class FlagshipProgrammesDetail extends PureComponent {
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
        <FlagshipProgrammesProvider />
      </div>
    );
  }
}

FlagshipProgrammesDetail.propTypes = { flagshipDetailData: PropTypes.object };

FlagshipProgrammesDetail.defaultProps = { flagshipDetailData: null };

export default FlagshipProgrammesDetail;
