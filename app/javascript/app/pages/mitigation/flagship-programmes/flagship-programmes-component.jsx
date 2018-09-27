import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlagshipProgrammesInfo from './flagship-programmes-info';

class FlagshipProgrammes extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, search: value } });
  };

  render() {
    return (
      <div>
        <FlagshipProgrammesInfo />
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
