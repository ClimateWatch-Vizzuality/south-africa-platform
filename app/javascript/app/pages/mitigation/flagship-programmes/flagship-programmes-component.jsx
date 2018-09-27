import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlagshipProgrammesInfo from './flagship-programmes-info';
import PrioritisedFlagshipProgrammes from './prioritised-flagship-programmes';

class FlagshipProgrammes extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  render() {
    return (
      <div>
        <FlagshipProgrammesInfo />
        <PrioritisedFlagshipProgrammes />
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
