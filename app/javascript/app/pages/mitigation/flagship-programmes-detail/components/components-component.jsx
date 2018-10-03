import React, { PureComponent } from 'react';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import { PropTypes } from 'prop-types';
import SectionTitle from 'components/section-title';
import FlagshipButtons from 'components/flagship-buttons';
import styles from './components-styles';

class FlagshipProgrammesComponents extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, pageSection: section } = this.props;
    updateQueryParam({ id: value, section });
  };

  render() {
    return (
      <div className={styles.flagshipComponents}>
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

FlagshipProgrammesComponents.propTypes = {
  pageSection: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

FlagshipProgrammesComponents.defaultProps = { pageSection: null };

export default FlagshipProgrammesComponents;
