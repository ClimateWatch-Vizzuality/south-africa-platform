import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import styles from './flagship-programmes-styles.scss';

class FlagshipProgrammes extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle isSubtitle title="Flagship Programmes" />
      </div>
    );
  }
}

FlagshipProgrammes.propTypes = {
  query: PropTypes.object,
  updateQueryParam: PropTypes.func.isRequired
};

FlagshipProgrammes.defaultProps = { query: null };

export default FlagshipProgrammes;
